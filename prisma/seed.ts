import { PrismaClient } from '@prisma/client';
import { HashServiceBcrypt } from '../src/infra/shared/services/hash-service-bcrypt';

const prisma = new PrismaClient();
const hashService = new HashServiceBcrypt();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: 'MANAGE_USERS',
        label: 'Manage Users',
        description: 'Allow user to manage users',
      },
      {
        name: 'MANAGE_PROFILES',
        label: 'Manage Profiles',
        description: 'Allow user to manage profiles',
      },
      {
        name: 'MANAGE_CATEGORIES',
        label: 'Manage Categories',
        description: 'Allow user to manage categories',
      },
      {
        name: 'MANAGE_BRANDS',
        label: 'Manage Brands',
        description: 'Allow user to manage brands',
      },
      {
        name: 'MANAGE_VEHICLES',
        label: 'Manage Vehicles',
        description: 'Allow user to manage vehicles',
      },
      {
        name: 'MANAGE_BANNERS',
        label: 'Manage Banners',
        description: 'Allow user to manage banners',
      },
      {
        name: 'MANAGE_LAYOUT',
        label: 'Manage Layout',
        description: 'Allow user to manage layout',
      },
      {
        name: 'MANAGE_SELLERS',
        label: 'Manage Sellers',
        description: 'Allow user to manage sellers',
      },
    ],
    skipDuplicates: true,
  });

  const profileExists = await prisma.profile.findFirst({
    where: {
      name: 'Admin',
    },
  });

  if (!profileExists) {
    const profile = await prisma.profile.create({
      data: {
        name: 'Admin',
      },
    });

    const roles = await prisma.role.findMany();
    const profileRoles = roles.map((role) => ({
      roleId: role.roleId,
      profileId: profile.profileId,
    }));

    await prisma.profileRoles.createMany({
      data: profileRoles,
      skipDuplicates: true,
    });

    const hashedPassword = await hashService.hash('password');
    await prisma.user.createMany({
      data: [
        {
          firstName: 'User',
          lastName: 'Example',
          email: 'user@example.com',
          password: hashedPassword,
          profileId: profile.profileId,
        },
      ],
      skipDuplicates: true,
    });
  }

  await prisma.brand.createMany({
    data: [
      {
        name: 'Honda',
        imageUrl: 'https://www.svgrepo.com/show/446876/honda.svg',
      },
      {
        name: 'Toyota',
        imageUrl: 'https://www.svgrepo.com/show/306868/toyota.svg',
      },
      {
        name: 'Chevrolet',
        imageUrl: 'https://www.svgrepo.com/show/446947/chevrolet.svg',
      },
      {
        name: 'Volkswagen',
        imageUrl: 'https://www.svgrepo.com/show/446932/volkswagen.svg',
      },
      {
        name: 'Ford',
        imageUrl: 'https://www.svgrepo.com/show/446869/ford.svg',
      },
    ],
    skipDuplicates: true,
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
