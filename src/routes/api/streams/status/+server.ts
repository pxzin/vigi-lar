// src/routes/api/streams/status/+server.ts
import { json } from '@sveltejs/kit';
import { getStreamStats } from '$lib/server/streams/server';

export async function GET() {
	const stats = getStreamStats();
	return json({ activeStreams: stats.length, channels: stats });
}
