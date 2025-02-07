import { PrismaClient } from '@prisma/client';
import { buildApp } from '../../main';

export const prismaTest = new PrismaClient();
export const fastifyTest = buildApp();

beforeAll(async () => {
  await fastifyTest.listen({
    port: 0,
  });
  await prismaTest.$connect();
  console.log('Connected to the database');
});

afterAll(async () => {
  // await prismaTest.user.deleteMany();
  await fastifyTest.close();
  await prismaTest.$disconnect();
  console.log('Disconnected from the database');
});
