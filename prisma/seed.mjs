import {prisma} from '../src/lib/prisma.js';

async function main() {
  const existingUsers = await prisma.user.findFirst();

  if (!existingUsers) {
    await prisma.user.create({
      data: {
        name: 'Default User',
        email: 'default@example.com',
        password: 'password123', // Reminder: this should be hashed in production
      },
    });

    console.log('✅ Seeded default user');
  } else {
    console.log('🟡 Users already exist. Skipping seed.');
  }
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
})