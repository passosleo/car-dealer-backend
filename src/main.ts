import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyMultipart from '@fastify/multipart';
import fastifyRateLimit from '@fastify/rate-limit';
import { sendResponse } from './infra/http/middlewares/response-sender-middleware';
import { authRoutes } from './infra/http/routes/auth-routes';
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { HttpException } from './infra/http/response/http-exception';
import { HttpStatus } from './infra/http/response/http-status';

function main() {
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.addHook('onRequest', sendResponse);

  // Error Handler
  app.setErrorHandler((err, req, reply) => {
    if (hasZodFastifySchemaValidationErrors(err)) {
      return reply.code(400).send({
        statusCode: 400,
        message: 'Bad Request',
        data: {
          error: err.validation,
        },
      });
    }

    if (isResponseSerializationError(err)) {
      return reply.code(500).send({
        statusCode: 500,
        message: 'Internal Server Error',
        data: {
          error: err.validation,
        },
      });
    }

    if (err instanceof HttpException) {
      return reply.sendResponse(err.statusCode, {
        error: err.message,
      });
    }

    return reply.sendResponse(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  // CORS
  app.register(fastifyCors, {
    origin: ['https://car-dealer-frontend-eosin.vercel.app', 'https://car-dealer-backend-lake.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Rate Limiting
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip,
    ban: 3,
    errorResponseBuilder: (_, context) => {
      return {
        statusCode: 429,
        message: 'Too Many Requests',
        data: {
          error: `You have exceeded the limit of ${context.max} requests. Please try again in ${context.after} seconds.`,
        },
      };
    },
  });

  // Security Headers
  app.register(fastifyHelmet, {
    xFrameOptions: {
      action: 'deny',
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
    referrerPolicy: {
      policy: 'no-referrer',
    },
    hidePoweredBy: true,
  });

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
  });

  app.get('/', async (_, res) => {
    res.redirect('/docs');
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
  });
}

main();
