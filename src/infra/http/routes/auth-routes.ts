import { FastifyInstance } from 'fastify';
import { AuthenticateUserController } from '../controllers/auth/authenticate-user-controller';

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/api/v1/auth/token',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Authenticate user',
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'OK',
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 200 },
              message: { type: 'string', example: 'OK' },
              data: {
                type: 'object',
                properties: {
                  type: { type: 'string', example: 'Bearer' },
                  token: { type: 'string', example: 'token' },
                  refreshToken: { type: 'string', example: 'refresh-token' },
                  expiresIn: { type: 'number', example: 3600 },
                },
              },
            },
          },
          404: {
            description: 'Not Found',
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 404 },
              message: { type: 'string', example: 'Not Found' },
              data: {},
            },
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 401 },
              message: { type: 'string', example: 'Unauthorized' },
              data: {},
            },
          },
          500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 500 },
              message: { type: 'string', example: 'Internal Server Error' },
            },
          },
        },
      },
    },
    AuthenticateUserController.handle,
  );
}
