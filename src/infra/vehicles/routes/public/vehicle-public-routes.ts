import { z } from 'zod';
import { FastifyTypedInstance } from '../../../shared/types/fastify';
import { vehicleResponseSchema } from '../../schemas/shared/vehicle-response-schema';
import { ListActiveVehiclesController } from '../../controllers/public/list-active-vehicles-controller';
import { listActiveVehiclesRequestSchema } from '../../schemas/public/list-active-vehicles-request-schema';
import { GetActiveVehicleByIdController } from '../../controllers/public/get-active-vehicle-by-id-controller';

export async function vehiclePublicRoutes(app: FastifyTypedInstance) {
  app.get(
    '/api/v1/public/vehicle',
    {
      schema: {
        tags: ['Vehicles'],
        summary: 'List active vehicles',
        querystring: listActiveVehiclesRequestSchema,
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
    ListActiveVehiclesController.handle,
  );
  app.get(
    '/api/v1/public/vehicle/:vehicleId',
    {
      schema: {
        tags: ['Vehicles'],
        summary: 'Get an active vehicle by id',
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
          404: z.object({
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
    GetActiveVehicleByIdController.handle,
  );
}
