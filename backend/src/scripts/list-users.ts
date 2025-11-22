import prisma from '../utils/db';

async function main() {
    const users = await prisma.user.findMany();
    console.log('--- Lista de Usuários ---');
    console.table(users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role
    })));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
