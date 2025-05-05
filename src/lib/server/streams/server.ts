import { spawn } from 'child_process';
import { WebSocketServer } from 'ws';
import { RTSP_USER, RTSP_PASS, RTSP_HOST } from '$env/static/private';

const BASE_PORT = 10000;
const streams = new Map<number, { port: number; clients: Set<WebSocket> }>();

export async function startStream(channel: number): Promise<{ port: number }> {
	if (streams.has(channel)) return streams.get(channel)!;

	const PORT = BASE_PORT + channel;
	const WIDTH = 640;
	const HEIGHT = 360;

	const user = RTSP_USER || 'admin';
	const pass = RTSP_PASS ?? ''; // permite senha em branco
	const host = RTSP_HOST;

	if (!host) throw new Error('RTSP_HOST não definido no ambiente');

	const RTSP_URL = `rtsp://${host}:554/user=${user}&password=${pass}&channel=${channel}&stream=0.sdp`;

	let wss: WebSocketServer;
	try {
		wss = new WebSocketServer({ port: PORT });
	} catch (error: any) {
		if (error.code === 'EADDRINUSE') {
			console.warn(`⚠️ Porta ${PORT} já está em uso. Canal ${channel} pode estar em uso paralelo.`);
			return streams.get(channel)!;
		}
		throw error;
	}

	const clients = new Set<WebSocket>();
	let disconnectTimer: NodeJS.Timeout;

	console.log(`🟢 Canal ${channel} ativo em ws://localhost:${PORT}`);

	const ffmpeg = spawn('ffmpeg', [
		'-rtsp_transport',
		'tcp',
		'-fflags',
		'nobuffer+genpts',
		'-probesize',
		'32',
		'-analyzeduration',
		'0',
		'-i',
		RTSP_URL,
		'-an',
		'-vf',
		`scale=${WIDTH}:${HEIGHT}`,
		'-c:v',
		'mpeg1video',
		'-b:v',
		'2000k',
		'-bf',
		'0',
		'-g',
		'1',
		'-r',
		'30',
		'-f',
		'mpeg1video',
		'pipe:1'
	]);

	ffmpeg.stderr.on('data', (msg) => {
		const message = msg.toString();
		if (!message.includes('frame=')) {
			console.error(`[CH ${channel} FFmpeg]`, message.trim());
		}
	});

	ffmpeg.stdout.on('data', (chunk) => {
		for (const client of clients) {
			if (client.readyState === client.OPEN) {
				client.send(chunk);
			}
		}
	});

	wss.on('connection', (ws) => {
		console.log(`👤 Cliente conectado ao canal ${channel}`);
		clients.add(ws);
		clearTimeout(disconnectTimer);

		// Envia header jsmpeg
		const header = Buffer.alloc(8);
		header.write('jsmp');
		header.writeUInt16BE(WIDTH, 4);
		header.writeUInt16BE(HEIGHT, 6);
		ws.send(header);

		const handleClose = () => {
			clients.delete(ws);
			if (clients.size === 0) {
				console.log(`⌛ Canal ${channel} sem clientes — iniciando timer de desligamento`);
				disconnectTimer = setTimeout(() => {
					console.log(`🛑 Encerrando canal ${channel} por inatividade`);
					ffmpeg.kill('SIGINT');
					wss.close();
					streams.delete(channel);
				}, 30_000);
			}
		};

		ws.on('close', handleClose);
		ws.on('error', handleClose);
	});

	// Apenas após o primeiro chunk considera o stream iniciado
	return new Promise((resolve) => {
		ffmpeg.stdout.once('data', () => {
			console.log(`✅ Stream do canal ${channel} pronta`);
			streams.set(channel, { port: PORT, clients });
			resolve({ port: PORT });
		});
	});
}

export function getStreamsStatus() {
	const channels = [...streams.entries()].map(([channel, { clients }]) => ({
		channel,
		clients: clients.size
	}));

	return {
		activeStreams: channels.length,
		channels
	};
}
