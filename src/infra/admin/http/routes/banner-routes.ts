import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { authorize } from '../../../shared/http/middlewares/auth-middleware';
import { ListBannersController } from '../controllers/banners/list-banners-controller';
import { GetBannerByIdController } from '../controllers/banners/get-banner-by-id-controller';
import { CreateBannerController } from '../controllers/banners/create-banner-controller';
import { UpdateBannerController } from '../controllers/banners/update-banner-controller';
import { DeleteBannerController } from '../controllers/banners/delete-banner-controller';

export async function bannerRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/banner',
    {
      preHandler: authorize(['MANAGE_BANNERS']),
      schema: {
        tags: ['Banners'],
        summary: 'List banners',
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
          startAtStart: z.string().optional(),
          startAtEnd: z.string().optional(),
          endAtStart: z.string().optional(),
          endAtEnd: z.string().optional(),
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
                  bannerId: z.string().uuid(),
                  title: z.string(),
                  imageDesktopUrl: z.string(),
                  imageMobileUrl: z.string(),
                  startAt: z.date().nullable(),
                  endAt: z.date().nullable(),
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
    ListBannersController.handle,
  );
  app.get(
    '/api/v1/admin/banner/:bannerId',
    {
      preHandler: authorize(['MANAGE_BANNERS']),
      schema: {
        tags: ['Banners'],
        summary: 'Get a banner by id',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          bannerId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              bannerId: z.string().uuid(),
              title: z.string(),
              imageDesktopUrl: z.string(),
              imageMobileUrl: z.string(),
              startAt: z.date().nullable(),
              endAt: z.date().nullable(),
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
    GetBannerByIdController.handle,
  );
  app.post(
    '/api/v1/admin/banner',
    {
      preHandler: authorize(['MANAGE_BANNERS']),
      schema: {
        tags: ['Banners'],
        summary: 'Create a new banner',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.object({
          title: z.string(),
          imageDesktopUrl: z.string(),
          imageMobileUrl: z.string(),
          startAt: z.date().nullable(),
          endAt: z.date().nullable(),
          active: z.boolean(),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              bannerId: z.string().uuid(),
              title: z.string(),
              imageDesktopUrl: z.string(),
              imageMobileUrl: z.string(),
              startAt: z.date().nullable(),
              endAt: z.date().nullable(),
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
    CreateBannerController.handle,
  );
  app.put(
    '/api/v1/admin/banner/:bannerId',
    {
      preHandler: authorize(['MANAGE_BANNERS']),
      schema: {
        tags: ['Banners'],
        summary: 'Update a banner',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          bannerId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string(),
          imageDesktopUrl: z.string(),
          imageMobileUrl: z.string(),
          startAt: z.date().nullable(),
          endAt: z.date().nullable(),
          active: z.boolean(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              bannerId: z.string().uuid(),
              title: z.string(),
              imageDesktopUrl: z.string(),
              imageMobileUrl: z.string(),
              startAt: z.date().nullable(),
              endAt: z.date().nullable(),
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
    UpdateBannerController.handle,
  );
  app.delete(
    '/api/v1/admin/banner/:bannerId',
    {
      preHandler: authorize(['MANAGE_BANNERS']),
      schema: {
        tags: ['Banners'],
        summary: 'Delete a banner',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          bannerId: z.string().uuid(),
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
    DeleteBannerController.handle,
  );
}
