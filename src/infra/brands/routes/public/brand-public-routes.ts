import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { ListActiveBrandsController } from '../../../controllers/public/list-active-brands-controller';

export async function brandPublicRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/public/brand',
    {
      schema: {
        tags: ['Brands'],
        summary: 'List active brands',
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
                  brandId: z.string().uuid(),
                  name: z.string(),
                  imageUrl: z.string(),
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
    ListActiveBrandsController.handle,
  );
}
