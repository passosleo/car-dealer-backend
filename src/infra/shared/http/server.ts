import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { sendResponse } from './middlewares/response-sender-middleware';
import { setupErrorHandler } from './middlewares/error-handler';
import { setupSwagger } from './config/swagger-config';
import { setupSecurity } from './config/security-config';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { authRoutes } from '../../admin/http/routes/auth-routes';
import { roleRoutes } from '../../admin/http/routes/role-routes';
import { profileRoutes } from '../../admin/http/routes/profile-routes';
import { brandRoutes } from '../../admin/http/routes/brand-routes';
import { categoryRoutes } from '../../admin/http/routes/category-routes';
import { bannerRoutes } from '../../admin/http/routes/banner-routes';
import { sellerRoutes } from '../../admin/http/routes/seller-routes';

export function createServer() {
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.addHook('onRequest', sendResponse);

  // Setup Middlewares
  setupErrorHandler(app);
  setupSwagger(app);
  setupSecurity(app);

  app.register(fastifyMultipart);
  app.register(authRoutes);
  app.register(roleRoutes);
  app.register(profileRoutes);
  app.register(brandRoutes);
  app.register(categoryRoutes);
  app.register(bannerRoutes);
  app.register(sellerRoutes);

  return app;
}
