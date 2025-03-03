import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { ListBrandsController } from '../controllers/list-brands-controller';
import { GetBrandByIdController } from '../controllers/get-brand-by-id-controller';
import { CreateBrandController } from '../controllers/create-brand-controller';
import { UpdateBrandController } from '../controllers/update-brand-controller';
import { DeleteBrandController } from '../controllers/delete-brand-controller';

export async function brandRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/brand',
    {
      preHandler: authorize(['MANAGE_BRANDS']),
      schema: {
        tags: ['Brands'],
        summary: 'List brands',
        security: [
          {
            bearerAuth: [],
          },
        ],
        querystring: z.object({
          page: z
            .string()
            .optional()
            .default('1')
            .transform((v) => Number(v)),
          limit: z
            .string()
            .optional()
            .default('10')
            .transform((v) => Number(v)),
          orderBy: z.string().toLowerCase().optional().default('asc'),
          search: z.string().optional(),
          active: z
            .string()
            .optional()
            .transform((v) => (v === 'true' ? true : v === 'false' ? false : undefined)),
          createdAtStart: z.string().optional(),
          createdAtEnd: z.string().optional(),
          updatedAtStart: z.string().optional(),
          updatedAtEnd: z.string().optional(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              total: z.number(),
              page: z.number(),
              limit: z.number(),
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
    ListBrandsController.handle,
  );
  app.get(
    '/api/v1/admin/brand/:brandId',
    {
      preHandler: authorize(['MANAGE_BRANDS']),
      schema: {
        tags: ['Brands'],
        summary: 'Get a brand by id',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          brandId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              brandId: z.string().uuid(),
              name: z.string(),
              imageUrl: z.string(),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
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
    GetBrandByIdController.handle,
  );
  app.post(
    '/api/v1/admin/brand',
    {
      preHandler: authorize(['MANAGE_BRANDS']),
      schema: {
        tags: ['Brands'],
        summary: 'Create a new brand',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.object({
          name: z.string(),
          imageUrl: z.string(),
          active: z.boolean(),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              brandId: z.string().uuid(),
              name: z.string(),
              imageUrl: z.string(),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
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
    CreateBrandController.handle,
  );
  app.put(
    '/api/v1/admin/brand/:brandId',
    {
      preHandler: authorize(['MANAGE_BRANDS']),
      schema: {
        tags: ['Brands'],
        summary: 'Update a brand',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          brandId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          imageUrl: z.string(),
          active: z.boolean(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              brandId: z.string().uuid(),
              name: z.string(),
              imageUrl: z.string(),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
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
    UpdateBrandController.handle,
  );
  app.delete(
    '/api/v1/admin/brand/:brandId',
    {
      preHandler: authorize(['MANAGE_BRANDS']),
      schema: {
        tags: ['Brands'],
        summary: 'Delete a brand',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          brandId: z.string().uuid(),
        }),
        response: {
          204: z.void(),
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
    DeleteBrandController.handle,
  );
}
