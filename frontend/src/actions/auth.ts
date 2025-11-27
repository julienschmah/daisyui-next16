'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data: any) => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            cache: 'no-store',
        });

        const result = await res.json();

        if (!res.ok) {
            return { error: result.message || 'Falha no login' };
        }

        // Set cookie
        (await cookies()).set('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        // Also store user info for easy access (optional, better to decode token)
        (await cookies()).set('userId', result.user.id);
        (await cookies()).set('userRole', result.user.role);

        return { success: true, user: result.user };
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Erro de conexão com o servidor' };
    }
};

export const register = async (data: any) => {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            cache: 'no-store',
        });

        const result = await res.json();

        if (!res.ok) {
            return { error: result.message || 'Falha no cadastro' };
        }

        (await cookies()).set('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        (await cookies()).set('userId', result.user.id);
        (await cookies()).set('userRole', result.user.role);

        return { success: true, user: result.user };
    } catch (error) {
        console.error('Register error:', error);
        return { error: 'Erro de conexão com o servidor' };
    }
};

export const logout = async () => {
    (await cookies()).delete('token');
    (await cookies()).delete('userId');
    (await cookies()).delete('userRole');
    redirect('/login');
};
