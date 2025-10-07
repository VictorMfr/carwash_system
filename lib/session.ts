import 'server-only';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import api from './axios';

const secretKey = process.env.SESSION_SECRET || 'secret';

export async function encrypt(payload: { userId: string, expiresAt: Date }) {
    return jwt.sign(payload, secretKey, { expiresIn: '7d' })
}

export async function decrypt(session: string | undefined = '') {
    return jwt.verify(session, secretKey) as { userId: string, expiresAt: Date }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await jwt.sign({ userId, expiresAt }, secretKey, { expiresIn: '7d' })
    const cookieStore = await cookies()

    await cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function updateSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value

    if (!session) {
        return null
    }

    const payload = await decrypt(session);

    if (!payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })

    return session
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value

    if (!session) {
        return null
    }

    return session
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}