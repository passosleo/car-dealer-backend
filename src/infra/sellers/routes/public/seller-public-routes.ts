import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { ListActiveSellersController } from '../../controllers/public/list-active-sellers-controller';

export async function sellerPublicRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/public/seller',
    {
      schema: {
        tags: ['Sellers'],
        summary: 'List active sellers',
        querystring: z.object({
          page: z.coerce.number().optional().default(1),
          limit: z.coerce.number().optional().default(10),
          orderBy: z.enum(['asc', 'desc']).optional().default('asc'),
          search: z.string().optional(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              total: z.number(),
              page: z.number(),
              limit: z.number(),
              totalPages: z.number(),
              items: z.array(
                z.object({
                  sellerId: z.string().uuid(),
                  firstName: z.string(),
                  lastName: z.string().nullable(),
                  email: z.string().email().nullable(),
                  phone: z.string().nullable(),
                  imageUrl: z.string().nullable(),
                  customMessage: z.string().nullable(),
                  active: z.boolean(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                }),
              ),
            }),
          }),
          400: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.array(z.any()),
            }),
          }),
          401: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          422: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          429: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          500: z.object({
            statusCode: z.number(),
            message: z.string(),
          }),
        },
      },
    },
    ListActiveSellersController.handle,
  );
}
