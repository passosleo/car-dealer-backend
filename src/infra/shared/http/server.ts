import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { sendResponse } from './middlewares/response-sender-middleware';
import { setupErrorHandler } from './middlewares/error-handler';
import { setupSwagger } from './config/swagger-config';
import { setupSecurity } from './config/security-config';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { authRoutes } from '../../admin/auth/http/routes/auth-routes';
import { categoryRoutes } from '../../admin/categories/http/routes/category-routes';
import { sellerRoutes } from '../../admin/sellers/http/routes/seller-routes';
import { bannerRoutes } from '../../admin/banners/http/routes/banner-routes';
import { brandRoutes } from '../../admin/brands/http/routes/brand-routes';
import { profileRoutes } from '../../admin/profiles/http/routes/profile-routes';
import { roleRoutes } from '../../admin/roles/http/routes/role-routes';
import { userRoutes } from '../../admin/users/http/routes/user-routes';

export function createServer() {
  const app = fastify({
    bodyLimit: 50 * 1024 * 1024, // 50MB
  }).withTypeProvider<ZodTypeProvider>();

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
  app.register(userRoutes);

  return app;
}
