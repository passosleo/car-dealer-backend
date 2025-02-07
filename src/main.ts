import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyMultipart from '@fastify/multipart';
import { sendResponse } from './infra/http/middlewares/response-sender-middleware';
import { authRoutes } from './infra/http/routes/auth-routes';

export function buildApp() {
  const app = Fastify();

  app.addHook('onRequest', sendResponse);

  app.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Car Dealer API',
        description: 'Documentation for the Car Dealer API',
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
  });

  app.register(fastifySwaggerUI, {
    theme: {
      title: 'Car Dealer API',
    },
    routePrefix: '/swagger-ui',
  });

  app.register(fastifyMultipart);
  app.register(authRoutes);

  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 4000;
  const app = buildApp();

  app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening at ${address}`);
    console.info(`Swagger documentation available at ${address}/swagger-ui`);
  });
}
