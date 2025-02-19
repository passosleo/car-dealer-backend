import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { CreateProfileController } from '../controllers/profiles/create-profile-controller';
import { UpdateProfileController } from '../controllers/profiles/update-profile-controller';

export async function profileRoutes(app: FastifyTypedInstance) {
  app.post(
    '/api/v1/admin/profile',
    {
      // preHandler: authorize(['admin']),
      schema: {
        tags: ['Profiles'],
        summary: 'Create a new profile',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: z.object({
          name: z.string(),
          roles: z
            .array(
              z.object({
                roleId: z.string().uuid(),
              }),
            )
            .nonempty(),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              profileId: z.string().uuid(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              roles: z.array(
                z.object({
                  roleId: z.string().uuid(),
                  name: z.string(),
                  label: z.string(),
                  description: z.string().nullable(),
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
    CreateProfileController.handle,
  );
  app.put(
    '/api/v1/admin/profile/:profileId',
    {
      // preHandler: authorize(['admin']),
      schema: {
        tags: ['Profiles'],
        summary: 'Create a new profile',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          profileId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          roles: z
            .array(
              z.object({
                roleId: z.string().uuid(),
              }),
            )
            .nonempty(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              profileId: z.string().uuid(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              roles: z.array(
                z.object({
                  roleId: z.string().uuid(),
                  name: z.string(),
                  label: z.string(),
                  description: z.string().nullable(),
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
    UpdateProfileController.handle,
  );
}
