// src/hooks.server.js
import { verifyAccessToken, verifyRefreshToken, generateTokens, setTokenCookies } from '$lib/auth.js';

/**
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
    const accessToken  = event.cookies.get('accessToken');
    let user = accessToken && verifyAccessToken(accessToken);

    // if access token expired but we have a valid refresh, rotate it
    if (!user) {
        const refreshToken = event.cookies.get('refreshToken');
        const payload      = refreshToken && verifyRefreshToken(refreshToken);

        if (payload) {
            const tokens = generateTokens({
                id:    payload.id,
                email: payload.email,
                role:  payload.role
            });

            setTokenCookies(event.cookies, tokens.accessToken, tokens.refreshToken);
            user = verifyAccessToken(tokens.accessToken);
        }
    }

    // expose to all load() calls
    event.locals.user = user ?? null;

    return resolve(event);
}
