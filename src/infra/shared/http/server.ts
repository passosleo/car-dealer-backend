import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { sendResponse } from './middlewares/response-sender-middleware';
import { setupErrorHandler } from './middlewares/error-handler';
import { setupSwagger } from './config/swagger-config';
import { setupSecurity } from './config/security-config';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { authRoutes } from '../../auth/routes/admin/auth-routes';
import { roleRoutes } from '../../roles/routes/admin/role-routes';
import { profileRoutes } from '../../profiles/routes/admin/profile-routes';
import { brandRoutes } from '../../brands/routes/admin/brand-routes';
import { categoryRoutes } from '../../categories/routes/admin/category-routes';
import { bannerRoutes } from '../../banners/routes/admin/banner-routes';
import { sellerRoutes } from '../../sellers/routes/admin/seller-routes';
import { userRoutes } from '../../users/routes/admin/user-routes';
import { vehicleRoutes } from '../../vehicles/routes/admin/vehicle-routes';
import { brandPublicRoutes } from '../../brands/routes/public/brand-public-routes';
import { categoryPublicRoutes } from '../../categories/routes/public/category-public-routes';
import { vehiclePublicRoutes } from '../../vehicles/routes/public/vehicle-public-routes';
import { sellerPublicRoutes } from '../../sellers/routes/public/seller-public-routes';
import { layoutComponentAdminRoutes } from '../../layout/components/routes/admin/layout-component-admin-routes';
import { layoutTopBarAdminRoutes } from '../../layout/top-bar/routes/admin/layout-top-bar-admin-routes';

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
  app.register(vehicleRoutes);
  app.register(brandPublicRoutes);
  app.register(categoryPublicRoutes);
  app.register(vehiclePublicRoutes);
  app.register(sellerPublicRoutes);
  app.register(layoutComponentAdminRoutes);
  app.register(layoutTopBarAdminRoutes);

  return app;
}
