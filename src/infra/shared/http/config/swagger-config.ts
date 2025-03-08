import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export function setupSwagger(app: FastifyInstance) {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Car Dealer API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      requestInterceptor: async (req) => {
        const baseUrl = new URL(req.url).origin;
        const fetchToken = await fetch(`${baseUrl}/api/v1/admin/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'user@example.com',
            password: 'password',
          }),
        });
        const { data } = (await fetchToken.json()) as { data: { token: string } };

        req.headers = {
          ...req.headers,
          Authorization: `Bearer ${data.token}`,
        };
        return req;
      },
    },
  });

  app.get('/', async (_, res) => {
    res.redirect('/docs');
  });
}
