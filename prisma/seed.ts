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
        description: 'Permite ao usuário configurar o layout e aparência do site',
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

  await prisma.layoutComponent.createMany({
    data: [
      {
        label: 'Top-Bar',
        name: 'top-bar',
        page: 'home',
        description: 'Configure a barra de mensagens rotativas',
        position: 1,
        active: true,
      },
      {
        label: 'Cabeçalho',
        name: 'header',
        page: 'home',
        description: 'Configure o cabeçalho do site',
        position: 2,
        active: true,
      },
      {
        label: 'Banners',
        name: 'banners',
        page: 'home',
        description: 'Configure a barra de banners rotativos',
        position: 3,
        active: true,
      },
      {
        label: 'Info',
        name: 'info',
        page: 'home',
        description: 'Configure a seção de informações do site',
        position: 4,
        active: true,
      },
      {
        label: 'Shelf',
        name: 'footer',
        page: 'home',
        description: 'Configure o rodapé do site',
        position: 5,
        active: true,
      },
      {
        label: 'Categorias',
        name: 'categories',
        page: 'home',
        description: 'Configure a seção de categorias de veículos',
        position: 6,
        active: true,
      },
      {
        label: 'Marcas',
        name: 'brands',
        page: 'home',
        description: 'Configure a seção de marcas de veículos',
        position: 7,
        active: true,
      },
      {
        label: 'Vendedores',
        name: 'sellers',
        page: 'home',
        description: 'Configure a seção de vendedores',
        position: 8,
        active: true,
      },
      {
        label: 'Localização',
        name: 'location',
        page: 'home',
        description: 'Configure a seção de localização da empresa e filiais',
        position: 9,
        active: true,
      },
      {
        label: 'Rodapé',
        name: 'footer',
        page: 'home',
        description: 'Configure o rodapé do site',
        position: 10,
        active: true,
      },
    ],
    skipDuplicates: true,
  });

  const topBarComponent = await prisma.layoutComponent.findFirst({
    where: { name: 'top-bar' },
  });

  if (topBarComponent) {
    await prisma.layoutTopBarConfig.create({
      data: {
        layoutComponentId: topBarComponent.layoutComponentId,
        maxItems: 10,
        loop: true,
        delay: 3000,
        direction: 'ltr',
        jump: false,
        hideOnMobile: false,
        hideOnDesktop: false,
        active: true,
        layoutTopBarMessages: {
          create: [
            {
              message: 'Bem-vindo ao nosso site!',
              position: 1,
              active: true,
            },
            {
              message: 'Confira nossas promoções especiais!',
              position: 2,
              active: true,
            },
            {
              message: 'Veículos novos chegando em breve!',
              position: 3,
              active: true,
            },
          ],
        },
      },
    });
  }

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
