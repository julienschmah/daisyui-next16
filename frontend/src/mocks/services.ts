export interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    reviewsCount: number;
    image: string;
    category: string;
    provider: {
        id: string;
        name: string;
        avatar: string;
        verified: boolean;
    };
}

export const CATEGORIES = [
    'Encanamento',
    'Elétrica',
    'Limpeza',
    'Pintura',
    'Carpintaria',
    'Jardinagem',
    'Montagem de Móveis',
    'Mudanças',
];

export const MOCK_SERVICES: Service[] = [
    {
        id: '1',
        title: 'Reparo de Vazamentos e Encanamento Geral',
        description: 'Serviço completo de encanamento, incluindo detecção de vazamentos, troca de torneiras e desentupimento.',
        price: 150.00,
        rating: 4.8,
        reviewsCount: 124,
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2072&auto=format&fit=crop',
        category: 'Encanamento',
        provider: {
            id: 'p1',
            name: 'Carlos Silva',
            avatar: 'https://i.pravatar.cc/150?u=p1',
            verified: true,
        },
    },
    {
        id: '2',
        title: 'Instalação Elétrica Residencial',
        description: 'Instalação de tomadas, luminárias, chuveiros e revisão de quadro elétrico.',
        price: 200.00,
        rating: 4.9,
        reviewsCount: 89,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
        category: 'Elétrica',
        provider: {
            id: 'p2',
            name: 'Roberto Almeida',
            avatar: 'https://i.pravatar.cc/150?u=p2',
            verified: true,
        },
    },
    {
        id: '3',
        title: 'Limpeza Pesada Pós-Obra',
        description: 'Limpeza detalhada para residências e escritórios após reformas ou construções.',
        price: 350.00,
        rating: 4.7,
        reviewsCount: 210,
        image: 'https://images.unsplash.com/photo-1581578731117-104f2a863cc5?q=80&w=2070&auto=format&fit=crop',
        category: 'Limpeza',
        provider: {
            id: 'p3',
            name: 'Maria Oliveira',
            avatar: 'https://i.pravatar.cc/150?u=p3',
            verified: true,
        },
    },
    {
        id: '4',
        title: 'Pintura de Apartamento Completo',
        description: 'Pintura profissional de paredes e tetos. Material não incluso.',
        price: 800.00,
        rating: 4.6,
        reviewsCount: 56,
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
        category: 'Pintura',
        provider: {
            id: 'p4',
            name: 'João Santos',
            avatar: 'https://i.pravatar.cc/150?u=p4',
            verified: false,
        },
    },
    {
        id: '5',
        title: 'Montagem de Móveis Planejados',
        description: 'Montagem e desmontagem de móveis de qualquer marca.',
        price: 120.00,
        rating: 4.9,
        reviewsCount: 340,
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2072&auto=format&fit=crop', // Placeholder
        category: 'Montagem de Móveis',
        provider: {
            id: 'p5',
            name: 'André Costa',
            avatar: 'https://i.pravatar.cc/150?u=p5',
            verified: true,
        },
    },
];
