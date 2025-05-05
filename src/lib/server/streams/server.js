// stream/server.js
import { spawn } from 'child_process';
import { WebSocketServer } from 'ws';

const BASE_PORT = 10000;
const streams = new Map(); // canal => { port }
const streamsMeta = new Map(); // canal => { clients: Set<WebSocket> }
const channelLocks = new Map();
import { DEBUG_LOG_CHANNELS } from './debug.js';

export async function startStream(channel) {
	if (channelLocks.has(channel)) return channelLocks.get(channel);

	const streamPromise = _startStream(channel);
	channelLocks.set(channel, streamPromise);

	try {
		const result = await streamPromise;
		return result;
	} finally {
		channelLocks.delete(channel);
	}
}

async function _startStream(channel) {
	if (streams.has(channel)) return streams.get(channel);

	const PORT = BASE_PORT + channel;
	const RTSP_URL = `rtsp://***REMOVED***:554/user=***REMOVED***&password=&channel=${channel}&stream=0.sdp`;
	const WIDTH = 640;
	const HEIGHT = 360;

	let wss;

	try {
		wss = new WebSocketServer({ port: PORT });
	} catch (error) {
		if (error.code === 'EADDRINUSE') {
			console.warn(
				`⚠️ Porta ${PORT} já está em uso. Canal ${channel} pode estar em estado inconsistente.`
			);
			return streams.get(channel);
		}
		throw error;
	}

	const clients = new Set();
	streamsMeta.set(channel, { clients }); // 👈 salva meta

	let disconnectTimer;

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
		const line = msg.toString();
		if (/frame=\s*\d+/.test(line) && !DEBUG_LOG_CHANNELS.has(channel)) return;
		console.error(`[CH ${channel} FFmpeg]`, line.trim());
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

		const header = Buffer.alloc(8);
		header.write('jsmp');
		header.writeUInt16BE(WIDTH, 4);
		header.writeUInt16BE(HEIGHT, 6);
		ws.send(header);

		ws.on('close', () => {
			clients.delete(ws);
			if (clients.size === 0) {
				console.log(`⌛ Canal ${channel} sem clientes — iniciando timer de desligamento`);
				disconnectTimer = setTimeout(() => {
					console.log(`🛑 Encerrando canal ${channel} por inatividade`);
					ffmpeg.kill('SIGINT');
					wss.close();
					streams.delete(channel);
					streamsMeta.delete(channel);
				}, 30_000);
			}
		});

		ws.on('error', () => {
			console.warn(`⚠️ Erro no cliente WebSocket canal ${channel}`);
			ws.close();
		});
	});

	const ready = new Promise((resolve) => {
		ffmpeg.stdout.once('data', () => {
			console.log(`✅ Stream do canal ${channel} pronta`);
			const streamInfo = { port: PORT };
			streams.set(channel, streamInfo);
			resolve(streamInfo);
		});
	});

	return ready;
}

// ⏱ Loga status a cada 10 segundos
setInterval(() => {
	console.log(`📊 Streams ativas: ${streamsMeta.size}`);
	for (const [channel, { clients }] of streamsMeta.entries()) {
		console.log(` - Canal ${channel}: ${clients.size} cliente(s)`);
	}
}, 10_000);

// Exporta os metadados para API externa
export function getStreamStats() {
	const result = [];
	for (const [channel, { clients }] of streamsMeta.entries()) {
		result.push({ channel, clients: clients.size });
	}
	return result;
}
