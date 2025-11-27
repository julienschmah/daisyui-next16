import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AgendaScheduler from '@/components/agenda/AgendaScheduler';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getData(userId: string) {
    try {
        const [availabilityRes, bookingsRes] = await Promise.all([
            fetch(`${API_URL}/providers/${userId}/availability`, { cache: 'no-store' }),
            fetch(`${API_URL}/bookings?providerId=${userId}`, { cache: 'no-store' })
        ]);

        const availability = availabilityRes.ok ? await availabilityRes.json() : {};
        const bookings = bookingsRes.ok ? await bookingsRes.json() : [];

        return { availability, bookings };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { availability: {}, bookings: [] };
    }
}

export default async function AvailabilityPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const userRole = cookieStore.get('userRole')?.value;

    if (!userId || userRole !== 'provider') {
        redirect('/login');
    }

    const { availability, bookings } = await getData(userId);

    return <AgendaScheduler userId={userId} initialAvailability={availability} bookings={bookings} />;
}
