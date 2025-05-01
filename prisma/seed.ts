import { PrismaClient } from '@prisma/client';
import { HashServiceBcryptJS } from '../src/infra/shared/services/hash-service-bcryptjs';

const prisma = new PrismaClient();
const hashService = new HashServiceBcryptJS();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: 'MANAGE_USERS',
        label: 'Gerenciar Usuários',
        description: 'Permite ao usuário gerenciar o cadastro e permissões de outros usuários',
      },
      {
        name: 'MANAGE_PROFILES',
        label: 'Gerenciar Perfis',
        description: 'Permite ao usuário criar e editar perfis de acesso',
      },
      {
        name: 'MANAGE_CATEGORIES',
        label: 'Gerenciar Categorias',
        description: 'Permite ao usuário administrar as categorias de veículos disponíveis no sistema',
      },
      {
        name: 'MANAGE_BRANDS',
        label: 'Gerenciar Marcas',
        description: 'Permite ao usuário cadastrar, editar e remover marcas de veículos',
      },
      {
        name: 'MANAGE_VEHICLES',
        label: 'Gerenciar Veículos',
        description: 'Permite ao usuário gerenciar o cadastro e as informações dos veículos',
      },
      {
        name: 'MANAGE_BANNERS',
        label: 'Gerenciar Banners',
        description: 'Permite ao usuário criar e editar banners exibidos no site',
      },
      {
        name: 'MANAGE_LAYOUT',
        label: 'Gerenciar Layout',
        description: 'Permite ao usuário configurar o layout e aparência ddo site',
      },
      {
        name: 'MANAGE_SELLERS',
        label: 'Gerenciar Vendedores',
        description: 'Permite ao usuário administrar o cadastro e informações dos vendedores',
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
