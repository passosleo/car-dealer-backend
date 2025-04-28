import { z } from 'zod';
import { FastifyTypedInstance } from '../../../../shared/types/fastify';
import { authorize } from '../../../../shared/http/middlewares/auth-middleware';
import { ZodHelper } from '../../../../shared/helpers/zod-helper';
import { GetVehicleByIdController } from '../controllers/get-vehicle-by-id-controller';
import { CreateVehicleController } from '../controllers/create-vehicle-controller';
import { UpdateVehicleController } from '../controllers/update-vehicle-controller';
import { DeleteVehicleController } from '../controllers/delete-vehicle-controller';
import { ListVehiclesController } from '../controllers/list-vehicles-controller';

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
          priceStart: z.coerce.number().optional(),
          priceEnd: z.coerce.number().optional(),
          mileageStart: z.coerce.number().optional(),
          mileageEnd: z.coerce.number().optional(),
          yearStart: z.coerce.number().optional(),
          yearEnd: z.coerce.number().optional(),
          doors: z.coerce.number().optional(),
          seats: z.coerce.number().optional(),
          horsepowerStart: z.coerce.number().optional(),
          horsepowerEnd: z.coerce.number().optional(),
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
                  vehicleId: z.string().uuid(),
                  model: z.string(),
                  year: z.number(),
                  plate: z.string(),
                  description: z.string().nullable(),
                  price: z.number().nullable(),
                  mileage: z.number().nullable(),
                  color: z.string().nullable(),
                  transmission: z.string().nullable(),
                  fuelType: z.string().nullable(),
                  doors: z.number().nullable(),
                  seats: z.number().nullable(),
                  horsepower: z.number().nullable(),
                  torque: z.number().nullable(),
                  driveTrain: z.string().nullable(),
                  brand: z.object({
                    brandId: z.string().uuid(),
                    name: z.string(),
                    imageUrl: z.string(),
                    active: z.boolean(),
                    createdAt: z.date(),
                    updatedAt: z.date(),
                  }),
                  category: z.object({
                    categoryId: z.string().uuid(),
                    name: z.string(),
                    imageUrl: z.string(),
                    active: z.boolean(),
                    createdAt: z.date(),
                    updatedAt: z.date(),
                  }),
                  active: z.boolean(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  vehicleImages: z.array(z.string()),
                  vehicleFeatures: z.array(z.string()),
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
            data: z.object({
              vehicleId: z.string().uuid(),
              model: z.string(),
              year: z.number(),
              plate: z.string(),
              description: z.string().nullable(),
              price: z.number().nullable(),
              mileage: z.number().nullable(),
              color: z.string().nullable(),
              transmission: z.string().nullable(),
              fuelType: z.string().nullable(),
              doors: z.number().nullable(),
              seats: z.number().nullable(),
              horsepower: z.number().nullable(),
              torque: z.number().nullable(),
              driveTrain: z.string().nullable(),
              brand: z.object({
                brandId: z.string().uuid(),
                name: z.string(),
                imageUrl: z.string(),
                active: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
              category: z.object({
                categoryId: z.string().uuid(),
                name: z.string(),
                imageUrl: z.string(),
                active: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
              vehicleImages: z.array(z.string()),
              vehicleFeatures: z.array(z.string()),
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
        body: z.object({
          model: z.string(),
          year: z.coerce.number(),
          plate: z.string(),
          description: z.string().nullable(),
          price: z.coerce.number().nullable(),
          mileage: z.coerce.number().nullable(),
          color: z.string().nullable(),
          transmission: z.string().nullable(),
          fuelType: z.string().nullable(),
          doors: z.coerce.number().nullable(),
          seats: z.coerce.number().nullable(),
          horsepower: z.coerce.number().nullable(),
          torque: z.coerce.number().nullable(),
          driveTrain: z.string().nullable(),
          brandId: z.string().uuid(),
          categoryId: z.string().uuid(),
          active: z.boolean(),
          vehicleImages: z.array(z.string()).optional().default([]),
          vehicleFeatures: z.array(z.string()).optional().default([]),
        }),
        response: {
          201: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              vehicleId: z.string().uuid(),
              model: z.string(),
              year: z.number(),
              plate: z.string(),
              description: z.string().nullable(),
              price: z.number().nullable(),
              mileage: z.number().nullable(),
              color: z.string().nullable(),
              transmission: z.string().nullable(),
              fuelType: z.string().nullable(),
              doors: z.number().nullable(),
              seats: z.number().nullable(),
              horsepower: z.number().nullable(),
              torque: z.number().nullable(),
              driveTrain: z.string().nullable(),
              brand: z.object({
                brandId: z.string().uuid(),
                name: z.string(),
                imageUrl: z.string(),
                active: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
              category: z.object({
                categoryId: z.string().uuid(),
                name: z.string(),
                imageUrl: z.string(),
                active: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
              vehicleImages: z.array(z.string()),
              vehicleFeatures: z.array(z.string()),
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
        body: z.object({
          model: z.string(),
          year: z.coerce.number(),
          plate: z.string(),
          description: z.string().nullable(),
          price: z.coerce.number().nullable(),
          mileage: z.coerce.number().nullable(),
          color: z.string().nullable(),
          transmission: z.string().nullable(),
          fuelType: z.string().nullable(),
          doors: z.coerce.number().nullable(),
          seats: z.coerce.number().nullable(),
          horsepower: z.coerce.number().nullable(),
          torque: z.coerce.number().nullable(),
          driveTrain: z.string().nullable(),
          brandId: z.string().uuid(),
          categoryId: z.string().uuid(),
          active: z.boolean(),
          vehicleImages: z.array(z.string()).optional().default([]),
          vehicleFeatures: z.array(z.string()).optional().default([]),
        }),
        response: {
          200: z.object({
            statusCode: z.number(),
            message: z.string(),
            data: z.object({
              vehicleId: z.string().uuid(),
              model: z.string(),
              year: z.number(),
              plate: z.string(),
              description: z.string().nullable(),
              price: z.number().nullable(),
              mileage: z.number().nullable(),
              color: z.string().nullable(),
              transmission: z.string().nullable(),
              fuelType: z.string().nullable(),
              doors: z.number().nullable(),
              seats: z.number().nullable(),
              horsepower: z.number().nullable(),
              torque: z.number().nullable(),
              driveTrain: z.string().nullable(),
              brand: z.object({
                brandId: z.string().uuid(),
                name: z.string(),
                imageUrl: z.string(),
                active: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
              category: z.object({
                categoryId: z.string().uuid(),
                name: z.string(),
                imageUrl: z.string(),
                active: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
              active: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
              vehicleImages: z.array(z.string()),
              vehicleFeatures: z.array(z.string()),
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
