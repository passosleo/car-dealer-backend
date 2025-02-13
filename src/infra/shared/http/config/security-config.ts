import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { HttpException } from '../response/http-exception';
import { HttpStatus } from '../response/http-status';

export function setupSecurity(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: ['https://car-dealer-frontend-eosin.vercel.app', 'https://car-dealer-backend-lake.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip,
    ban: 3,
    errorResponseBuilder: (_, context) =>
      new HttpException(
        HttpStatus.TOO_MANY_REQUESTS,
        `You have exceeded the limit of ${context.max} requests. Please try again in ${context.after} seconds.`,
      ),
  });

  app.register(fastifyHelmet, {
    xFrameOptions: { action: 'deny' },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    referrerPolicy: { policy: 'no-referrer' },
    hidePoweredBy: true,
  });
}
