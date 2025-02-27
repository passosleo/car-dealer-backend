import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { authorize } from '../../../shared/http/middlewares/auth-middleware';
import { ListCategoriesController } from '../controllers/categories/list-categories-controller';
import { GetCategoryByIdController } from '../controllers/categories/get-category-by-id-controller';
import { CreateCategoryController } from '../controllers/categories/create-category-controller';
import { UpdateCategoryController } from '../controllers/categories/update-category-controller';
import { DeleteCategoryController } from '../controllers/categories/delete-category-controller';

export async function categoryRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/category',
    {
      preHandler: authorize(['MANAGE_CATEGORIES']),
      schema: {
        tags: ['Categories'],
        summary: 'List categories',
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
                  categoryId: z.string().uuid(),
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
    ListCategoriesController.handle,
  );
  app.get(
    '/api/v1/admin/category/:categoryId',
    {
      preHandler: authorize(['MANAGE_CATEGORIES']),
      schema: {
        tags: ['Categories'],
        summary: 'Get a category by id',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          categoryId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              categoryId: z.string().uuid(),
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
    GetCategoryByIdController.handle,
  );
  app.post(
    '/api/v1/admin/category',
    {
      preHandler: authorize(['MANAGE_CATEGORIES']),
      schema: {
        tags: ['Categories'],
        summary: 'Create a new category',
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
              categoryId: z.string().uuid(),
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
    CreateCategoryController.handle,
  );
  app.put(
    '/api/v1/admin/category/:categoryId',
    {
      preHandler: authorize(['MANAGE_CATEGORIES']),
      schema: {
        tags: ['Categories'],
        summary: 'Update a category',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          categoryId: z.string().uuid(),
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
              categoryId: z.string().uuid(),
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
    UpdateCategoryController.handle,
  );
  app.delete(
    '/api/v1/admin/category/:categoryId',
    {
      preHandler: authorize(['MANAGE_CATEGORIES']),
      schema: {
        tags: ['Categories'],
        summary: 'Delete a category',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          categoryId: z.string().uuid(),
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
    DeleteCategoryController.handle,
  );
}
