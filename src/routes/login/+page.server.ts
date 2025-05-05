// src/routes/login/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

interface StubUser {
	id: string;
	password: string;
	roles: ('user' | '***REMOVED***')[];
}

const stubUsers: StubUser[] = [
	{ id: 'user1', password: 'userpass', roles: ['user'] },
	{ id: '***REMOVED***', password: '***REMOVED***pass', roles: ['***REMOVED***', 'user'] }
];

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		const form = await request.formData();
		const username = String(form.get('username') ?? '').trim();
		const password = String(form.get('password') ?? '');

		// procura usuário no stub
		const user = stubUsers.find((u) => u.id === username && u.password === password);

		if (!user) {
			return fail(400, {
				errorMsg: 'Usuário ou senha inválidos',
				username
			});
		}

		// grava o próprio username como sessão
		cookies.set('session_id', user.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60 * 24 // 1 dia
		});

		// define locals.user para este request
		locals.user = { id: user.id, roles: user.roles };

		throw redirect(303, '/');
	}
};
