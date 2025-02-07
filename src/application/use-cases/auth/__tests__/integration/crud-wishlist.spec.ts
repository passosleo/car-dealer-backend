import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
import { fastifyTest, prismaTest } from '../../../../../test/integration/jest.integration.setup';
import { Wishlist } from '@prisma/client';
import { CreateWishlistRequestDTO } from '../../../../../infra/http/dtos/wishlist/create-wishlist-request-dto';
import { UpdateWishlistRequestDTO } from '../../../../../infra/http/dtos/wishlist/update-wishlist-request-dto';

let createdWishlist: Wishlist;

describe('CRUD Wishlist', () => {
  describe('CreateWishlist', () => {
    it('should create a wishlist successfully', async () => {
      const payload = CreateWishlistRequestDTO.create({
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        priority: randomInt(1, 10),
      });

      const response = await fastifyTest.inject({
        method: 'POST',
        url: '/api/v1/wishlist',
        payload,
      });

      expect(response.statusCode).toBe(201);

      createdWishlist = await prismaTest.wishlist.findFirstOrThrow({
        where: { wishlistId: response.json().wishlistId },
      });

      expect(createdWishlist).toBeTruthy();
      expect(createdWishlist.name).toBe(payload.name);
      expect(createdWishlist.description).toBe(payload.description);
      expect(createdWishlist.priority).toBe(payload.priority);
    });
  });

  describe('ListWishlists', () => {
    it('should return a list of wishlists', async () => {
      const response = await fastifyTest.inject({
        method: 'GET',
        url: '/api/v1/wishlist/list',
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().data.length).toBe(1);
    });
  });

  describe('GetWishlistById', () => {
    it('should throw a not found exception when wishlist does not exist', async () => {
      const response = await fastifyTest.inject({
        method: 'GET',
        url: '/api/v1/wishlist/3fa85f64-5717-4562-b3fc-2c963f66afa6',
      });

      expect(response.statusCode).toBe(404);
    });

    it('should return a wishlist by a given id', async () => {
      const response = await fastifyTest.inject({
        method: 'GET',
        url: `/api/v1/wishlist/${createdWishlist.wishlistId}`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().data.wishlistId).toBe(createdWishlist.wishlistId);
    });
  });

  describe('UpdateWishlist', () => {
    it('should throw a not found exception when wishlist does not exist', async () => {
      const response = await fastifyTest.inject({
        method: 'PUT',
        url: '/api/v1/wishlist/3fa85f64-5717-4562-b3fc-2c963f66afa6',
        payload: {
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          priority: randomInt(1, 10),
        },
      });

      expect(response.statusCode).toBe(404);
    });

    it('should update a wishlist by a given id', async () => {
      const payload = UpdateWishlistRequestDTO.create({
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        priority: randomInt(1, 10),
      });

      const response = await fastifyTest.inject({
        method: 'PUT',
        url: `/api/v1/wishlist/${createdWishlist.wishlistId}`,
        payload,
      });

      expect(response.statusCode).toBe(200);

      const wishlist = await prismaTest.wishlist.findFirstOrThrow({
        where: { wishlistId: createdWishlist.wishlistId },
      });

      expect(wishlist).toBeTruthy();
      expect(wishlist.name).toBe(payload.name);
      expect(wishlist.description).toBe(payload.description);
      expect(wishlist.priority).toBe(payload.priority);
    });
  });

  describe('DeleteWishlist', () => {
    it('should throw a not found exception when wishlist does not exist', async () => {
      const response = await fastifyTest.inject({
        method: 'DELETE',
        url: '/api/v1/wishlist/3fa85f64-5717-4562-b3fc-2c963f66afa6',
      });

      expect(response.statusCode).toBe(404);

      const wishlist = await prismaTest.wishlist.findFirst({
        where: { wishlistId: createdWishlist.wishlistId },
      });

      expect(wishlist).toBeTruthy();
    });

    it('should delete a wishlist by a given id', async () => {
      const response = await fastifyTest.inject({
        method: 'DELETE',
        url: `/api/v1/wishlist/${createdWishlist.wishlistId}`,
      });

      expect(response.statusCode).toBe(204);

      const wishlist = await prismaTest.wishlist.findFirst({
        where: { wishlistId: createdWishlist.wishlistId },
      });

      expect(wishlist).toBeFalsy();
    });
  });
});
