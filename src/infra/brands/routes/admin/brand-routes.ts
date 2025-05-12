import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { authorize } from '../../../shared/http/middlewares/auth-middleware';
import { ZodHelper } from '../../../shared/helpers/zod-helper';
import { ListBrandsController } from '../../controllers/admin/list-brands-controller';
import { GetBrandByIdController } from '../../controllers/admin/get-brand-by-id-controller';
import { CreateBrandController } from '../../controllers/admin/create-brand-controller';
import { UpdateBrandController } from '../../controllers/admin/update-brand-controller';
import { DeleteBrandController } from '../../controllers/admin/delete-brand-controller';

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
          page: z.coerce.number().optional().default(1),
          limit: z.coerce.number().optional().default(10),
          orderBy: z.enum(['asc', 'desc']).optional().default('asc'),
          search: z.string().optional(),
          status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
          createdAtStart: ZodHelper.dateField('createdAtStart').optional(),
          createdAtEnd: ZodHelper.dateField('createdAtEnd').optional(),
          updatedAtStart: ZodHelper.dateField('updatedAtStart').optional(),
          updatedAtEnd: ZodHelper.dateField('updatedAtEnd').optional(),
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
          image: z.string(),
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
          image: z.string(),
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
