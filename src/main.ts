import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyMultipart from '@fastify/multipart';
import { sendResponse } from './infra/http/middlewares/response-sender-middleware';
import { authRoutes } from './infra/http/routes/auth-routes';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCors from '@fastify/cors';

function main() {
  const app = Fastify();

  app.addHook('onRequest', sendResponse);

  // CORS
  app.register(fastifyCors, {
    origin: ['https://car-dealer-frontend-eosin.vercel.app', 'https://car-dealer-backend-lake.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Rate Limiting
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip,
    ban: 3,
    errorResponseBuilder: (req, context) => {
      return {
        statusCode: 429,
        message: 'Too Many Requests',
        data: {
          error: 'Rate limit exceeded',
        },
      };
    },
  });

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

  const port = Number(process.env.PORT) || 4000;

  app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening at ${address}`);
    console.info(`Swagger documentation available at ${address}/swagger-ui`);
  });
}

main();
