// src/lib/server/stream/server.d.ts

export function startStream(channel: number): Promise<{ port: number }>;

export function getStreamStats(): { channel: number; clients: number }[];
