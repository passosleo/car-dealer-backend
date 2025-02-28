import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { HttpException } from '../response/http-exception';
import { HttpStatus } from '../response/http-status';
import { CONFIG } from '../../config';

export function setupSecurity(app: FastifyInstance) {
  const allowedOrigins = ['https://car-dealer-frontend-eosin.vercel.app', 'https://car-dealer-backend-lake.vercel.app'];

  app.register(fastifyCors, {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  app.addHook('onRequest', (req, _, done) => {
    const origin = req.headers.origin;
    const isProd = CONFIG.app.env === 'production';
    const isDocsUrl = req.url.includes('/docs');

    if (!isProd || (origin && allowedOrigins.includes(origin)) || (isDocsUrl && !origin)) {
      return done();
    }

    throw new HttpException(HttpStatus.FORBIDDEN, 'You are not allowed to access this resource.');
  });

  app.register(fastifyRateLimit, {
    max: 50,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip,
    ban: 3,
    errorResponseBuilder: (_, context) =>
      new HttpException(
        HttpStatus.TOO_MANY_REQUESTS,
        `You have exceeded the limit of ${context.max} requests. Please try again in ${context.after}.`,
      ),
  });

  app.register(fastifyHelmet, {
    xFrameOptions: { action: 'deny' },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    referrerPolicy: { policy: 'no-referrer' },
    hidePoweredBy: true,
  });
}
