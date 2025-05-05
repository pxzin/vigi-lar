// antes, você provavelmente tinha algo como:
// return { user: locals.user?.id };

// troque por isto:
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// aqui retornamos o objeto completo
	return {
		user: locals.user
	};
};
