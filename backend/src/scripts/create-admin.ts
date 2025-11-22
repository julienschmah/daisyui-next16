import prisma from '../utils/db';
import bcrypt from 'bcryptjs';

async function main() {
    const email = 'admin@example.com';
    const password = 'admin123'; // In production, use environment variables
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name: 'Administrador',
            email,
            password: hashedPassword,
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
        },
    });

    console.log('--- Admin User Created/Verified ---');
    console.log({
        id: admin.id,
        email: admin.email,
        role: admin.role,
        password: password // Showing plain password for user convenience
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
