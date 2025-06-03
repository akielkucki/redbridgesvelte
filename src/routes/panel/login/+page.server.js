import { generateTokens, setTokenCookies } from '$lib/auth.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        // Simple hardcoded check
        if (email !== HARDCODED_USER.email || password !== HARDCODED_USER.password) {
            return fail(400, { error: 'Invalid credentials' });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens({
            id: HARDCODED_USER.id,
            email: HARDCODED_USER.email,
            role: HARDCODED_USER.role
        });

        // Set cookies
        setTokenCookies(cookies, accessToken, refreshToken);

        throw redirect(302, '/panel/home');
    }
};

// Hardcoded user credentials
const HARDCODED_USER = {
    id: '1',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin'
};

async function getUserByEmail(email) {
    if (email === HARDCODED_USER.email) {
        return {
            id: HARDCODED_USER.id,
            email: HARDCODED_USER.email,
            hashedPassword: HARDCODED_USER.password,
            role: HARDCODED_USER.role
        };
    }
    return null;
}