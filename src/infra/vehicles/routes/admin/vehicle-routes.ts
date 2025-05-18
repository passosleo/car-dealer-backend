import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { authorize } from '../../../shared/http/middlewares/auth-middleware';
import { ListVehiclesController } from '../../controllers/admin/list-vehicles-controller';
import { GetVehicleByIdController } from '../../controllers/admin/get-vehicle-by-id-controller';
import { CreateVehicleController } from '../../controllers/admin/create-vehicle-controller';
import { UpdateVehicleController } from '../../controllers/admin/update-vehicle-controller';
import { DeleteVehicleController } from '../../controllers/admin/delete-vehicle-controller';
import { createVehicleRequestSchema } from '../../schemas/admin/create-vehicle-request-schema';
import { vehicleResponseSchema } from '../../schemas/shared/vehicle-response-schema';
import { updateVehicleRequestSchema } from '../../schemas/admin/update-vehicle-request-schema';
import { listVehiclesRequestSchema } from '../../schemas/admin/list-vehicles-request-schema';

export async function vehicleRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/admin/vehicle',
    {
      preHandler: authorize(['MANAGE_VEHICLES']),
      schema: {
        tags: ['Vehicles'],
        summary: 'List vehicles',
        security: [
          {
            bearerAuth: [],
          },
        ],
        querystring: listVehiclesRequestSchema,
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              total: z.number(),
              page: z.number(),
              limit: z.number(),
              totalPages: z.number(),
              items: z.array(vehicleResponseSchema),
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
    ListVehiclesController.handle,
  );
  app.get(
    '/api/v1/admin/vehicle/:vehicleId',
    {
      preHandler: authorize(['MANAGE_VEHICLES']),
      schema: {
        tags: ['Vehicles'],
        summary: 'Get a vehicle by id',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          vehicleId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: vehicleResponseSchema,
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
          404: z.object({
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
    GetVehicleByIdController.handle,
  );
  app.post(
    '/api/v1/admin/vehicle',
    {
      preHandler: authorize(['MANAGE_VEHICLES']),
      schema: {
        tags: ['Vehicles'],
        summary: 'Create a new vehicle',
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: createVehicleRequestSchema,
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: vehicleResponseSchema,
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
          409: z.object({
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
    CreateVehicleController.handle,
  );
  app.put(
    '/api/v1/admin/vehicle/:vehicleId',
    {
      preHandler: authorize(['MANAGE_VEHICLES']),
      schema: {
        tags: ['Vehicles'],
        summary: 'Update a vehicle',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          vehicleId: z.string().uuid(),
        }),
        body: updateVehicleRequestSchema,
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: vehicleResponseSchema,
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
          404: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              error: z.string(),
            }),
          }),
          409: z.object({
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
    UpdateVehicleController.handle,
  );
  app.delete(
    '/api/v1/admin/vehicle/:vehicleId',
    {
      preHandler: authorize(['MANAGE_VEHICLES']),
      schema: {
        tags: ['Vehicles'],
        summary: 'Delete a vehicle',
        security: [
          {
            bearerAuth: [],
          },
        ],
        params: z.object({
          vehicleId: z.string().uuid(),
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
          404: z.object({
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
    DeleteVehicleController.handle,
  );
}
