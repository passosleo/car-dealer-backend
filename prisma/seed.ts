import { PrismaClient } from '@prisma/client';
import { HashServiceBcrypt } from '../src/infra/shared/services/hash-service-bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashService = new HashServiceBcrypt();
  const hashedPassword = await hashService.hash('password');
  await prisma.user.createMany({
    data: [
      { firstName: 'Admin', lastName: 'User', email: 'user@example.com', createdBy: 'admin', password: hashedPassword },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
