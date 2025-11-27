'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const fetchProviderBookings = async () => {
    const providerId = (await cookies()).get('userId')?.value;
    if (!providerId) return [];

    try {
        const res = await fetch(`${API_URL}/bookings?providerId=${providerId}`, {
            cache: 'no-store',
        });

        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error('Error fetching provider bookings:', error);
        return [];
    }
};

export const createBooking = async (data: { serviceId: string; date: string; time: string }) => {
    const clientId = (await cookies()).get('userId')?.value;
    if (!clientId) return { error: 'Você precisa estar logado para agendar.' };

    try {
        // Combine date and time
        const bookingDate = new Date(`${data.date}T${data.time}:00`);

        const res = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serviceId: data.serviceId,
                date: bookingDate.toISOString(),
                clientId,
            }),
        });

        if (!res.ok) {
            const result = await res.json();
            return { error: result.message || 'Erro ao criar agendamento' };
        }

        return { success: true };
    } catch (error) {
        console.error('Error creating booking:', error);
        return { error: 'Erro de conexão' };
    }
};
