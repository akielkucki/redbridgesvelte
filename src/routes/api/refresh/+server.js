import { json } from '@sveltejs/kit';
import { verifyRefreshToken, generateTokens, setTokenCookies } from '$lib/auth.js';

export async function POST({ cookies }) {
    const refreshToken = cookies.get('refreshToken');

    if (!refreshToken) {
        return json({ error: 'No refresh token' }, { status: 401 });
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
        return json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
        id: payload.id,
        email: payload.email,
        role: payload.role
    });

    // Set new cookies
    setTokenCookies(cookies, accessToken, newRefreshToken);

    return json({ success: true });
}