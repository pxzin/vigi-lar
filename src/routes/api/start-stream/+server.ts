import { json } from '@sveltejs/kit';
import { startStream } from '$lib/server/streams/server.js';

export async function GET({ url }) {
	const channel = parseInt(url.searchParams.get('channel') || '1');
	if (isNaN(channel)) return json({ error: 'Invalid channel' }, { status: 400 });

	const { port } = await startStream(channel);
	return json({ wsUrl: `ws://${url.hostname}:${port}/` });
}
