import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/panel/login');
    }

    return {
        user: locals.user
    };
}