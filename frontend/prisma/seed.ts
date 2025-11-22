import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Create Providers (Users with role 'provider')
    const provider1 = await prisma.user.upsert({
        where: { email: 'carlos.silva@example.com' },
        update: {},
        create: {
            name: 'Carlos Silva',
            email: 'carlos.silva@example.com',
            password: 'hashed_password_123', // In a real app, hash this!
            role: 'provider',
            avatar: 'https://i.pravatar.cc/150?u=p1',
        },
    });

    const provider2 = await prisma.user.upsert({
        where: { email: 'roberto.almeida@example.com' },
        update: {},
        create: {
            name: 'Roberto Almeida',
            email: 'roberto.almeida@example.com',
            password: 'hashed_password_123',
            role: 'provider',
            avatar: 'https://i.pravatar.cc/150?u=p2',
        },
    });

    const provider3 = await prisma.user.upsert({
        where: { email: 'maria.oliveira@example.com' },
        update: {},
        create: {
            name: 'Maria Oliveira',
            email: 'maria.oliveira@example.com',
            password: 'hashed_password_123',
            role: 'provider',
            avatar: 'https://i.pravatar.cc/150?u=p3',
        },
    });

    // 2. Create Services
    const service1 = await prisma.service.create({
        data: {
            title: 'Reparo de Vazamentos e Encanamento Geral',
            description: 'Serviço completo de encanamento, incluindo detecção de vazamentos, troca de torneiras e desentupimento.',
            price: 150.00,
            category: 'Encanamento',
            image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2072&auto=format&fit=crop',
            providerId: provider1.id,
            reviews: {
                create: [
                    {
                        rating: 5,
                        comment: 'Excelente profissional! Resolveu o problema rápido.',
                        user: {
                            create: {
                                name: 'Cliente Feliz',
                                email: 'cliente1@example.com',
                                password: '123',
                                role: 'user'
                            }
                        }
                    }
                ]
            }
        },
    });

    const service2 = await prisma.service.create({
        data: {
            title: 'Instalação Elétrica Residencial',
            description: 'Instalação de tomadas, disjuntores, chuveiros e manutenção elétrica geral.',
            price: 200.00,
            category: 'Elétrica',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
            providerId: provider2.id,
        },
    });

    const service3 = await prisma.service.create({
        data: {
            title: 'Limpeza Pesada Pós-Obra',
            description: 'Limpeza detalhada para remover resíduos de construção, tinta e poeira.',
            price: 350.00,
            category: 'Limpeza',
            image: 'https://images.unsplash.com/photo-1581578731117-104f8a7469d0?q=80&w=2070&auto=format&fit=crop',
            providerId: provider3.id,
        },
    });

    console.log({ provider1, provider2, provider3, service1, service2, service3 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
