import { json } from '@sveltejs/kit';
import { getStreamsStatus } from '$lib/server/streams/server';

export async function GET() {
	const { activeStreams, channels } = getStreamsStatus();
	return json({ activeStreams, channels });
}
