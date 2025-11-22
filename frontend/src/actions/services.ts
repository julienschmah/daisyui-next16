'use server';

const API_URL = 'http://localhost:3001/api';

export const fetchServices = async (params: any) => {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.append('query', params.query);
    if (params.category) searchParams.append('category', params.category);
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());

    const res = await fetch(`${API_URL}/services?${searchParams.toString()}`, {
        cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch services');

    return res.json();
};

export const fetchServiceDetails = async (id: string) => {
    const res = await fetch(`${API_URL}/services/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) return null;

    return res.json();
};
