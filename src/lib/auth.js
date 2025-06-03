import jwt from 'jsonwebtoken';
import { dev } from '$app/environment';

const JWT_SECRET = process.env.JWT_SECRET || 'kdedin21m_i21!!f';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'jfgj923jno21mk.3qjnp21';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export function generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY
    });

    return { accessToken, refreshToken };
}

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, REFRESH_SECRET);
    } catch (error) {
        return null;
    }
}

export function setTokenCookies(cookies, accessToken, refreshToken) {
    cookies.set('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        secure: !dev,
        sameSite: 'strict',
        maxAge: 60 * 15 // 15 minutes
    });

    cookies.set('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: !dev,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });
}

export function clearTokenCookies(cookies) {
    cookies.delete('accessToken', { path: '/' });
    cookies.delete('refreshToken', { path: '/' });
}