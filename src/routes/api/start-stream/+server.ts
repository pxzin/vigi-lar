// src/routes/api/start-stream/+server.ts
import { startStream } from '$lib/server/streams/server';
import { json } from '@sveltejs/kit';

export async function GET({ url, request }) {
	const channel = Number(url.searchParams.get('channel') || 1);
	const streamInfo = await startStream(channel);

	const isSecure =
		request.headers.get('x-forwarded-proto') === 'https' || url.protocol === 'https:';
	const protocol = isSecure ? 'wss' : 'ws';

	const wsUrl = `${protocol}://${url.hostname}:${streamInfo.port}`;
	return json({ wsUrl });
}
