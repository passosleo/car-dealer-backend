import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { sendResponse } from './middlewares/response-sender-middleware';
import { authRoutes } from './routes/auth-routes';
import { setupErrorHandler } from './middlewares/error-handler';
import { setupSwagger } from './config/swagger-config';
import { setupSecurity } from './config/security-config';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';

export function createServer() {
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.addHook('onRequest', sendResponse);

  // Configuração de Middlewares
  setupErrorHandler(app);
  setupSwagger(app);
  setupSecurity(app);

  app.register(fastifyMultipart);
  app.register(authRoutes);

  return app;
}
