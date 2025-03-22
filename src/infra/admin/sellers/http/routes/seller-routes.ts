import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { ListSellersController } from '../controllers/list-sellers-controller';
import { GetSellerByIdController } from '../controllers/get-seller-by-id-controller';
import { CreateSellerController } from '../controllers/create-seller-controller';
import { UpdateSellerController } from '../controllers/update-seller-controller';
import { DeleteSellerController } from '../controllers/delete-seller-controller';
import { ZodHelper } from '../../../../shared/helpers/zod-helper';

export async function sellerRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/seller',
    {
      preHandler: authorize(['MANAGE_SELLERS']),
      schema: {
        tags: ['Sellers'],
        summary: 'List sellers',
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
    ListSellersController.handle,
  );
  app.get(
    '/api/v1/admin/seller/:sellerId',
    {
      preHandler: authorize(['MANAGE_SELLERS']),
      schema: {
        tags: ['Sellers'],
        summary: 'Get a seller by id',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          sellerId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
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
    GetSellerByIdController.handle,
  );
  app.post(
    '/api/v1/admin/seller',
    {
      preHandler: authorize(['MANAGE_SELLERS']),
      schema: {
        tags: ['Sellers'],
        summary: 'Create a new seller',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.object({
          firstName: z.string(),
          lastName: z.string().nullable(),
          email: z.string().email().nullable(),
          phone: z.string().nullable(),
          image: z.string().nullable(),
          customMessage: z.string().nullable(),
          active: z.boolean(),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
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
    CreateSellerController.handle,
  );
  app.put(
    '/api/v1/admin/seller/:sellerId',
    {
      preHandler: authorize(['MANAGE_SELLERS']),
      schema: {
        tags: ['Sellers'],
        summary: 'Update a seller',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          sellerId: z.string().uuid(),
        }),
        body: z.object({
          firstName: z.string(),
          lastName: z.string().nullable(),
          email: z.string().email().nullable(),
          phone: z.string().nullable(),
          image: z.string().nullable(),
          customMessage: z.string().nullable(),
          active: z.boolean(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
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
    UpdateSellerController.handle,
  );
  app.delete(
    '/api/v1/admin/seller/:sellerId',
    {
      preHandler: authorize(['MANAGE_SELLERS']),
      schema: {
        tags: ['Sellers'],
        summary: 'Delete a seller',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          sellerId: z.string().uuid(),
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
    DeleteSellerController.handle,
  );
}
