// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { STUB_USER } from '$env/static/private';

interface StubUser {
	id: string;
	password?: string;
	roles: ('user' | 'admin')[];
}

// mesmíssimo stubUsers do login
const stubUsers: StubUser[] = [
	{ id: 'user1', roles: ['user'] },
	{ id: STUB_USER, roles: ['admin', 'user'] }
];

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id');
	if (sessionId) {
		const user = stubUsers.find((u) => u.id === sessionId);
		if (user) {
			event.locals.user = { id: user.id, roles: user.roles };
		}
	}
	return await resolve(event);
};
