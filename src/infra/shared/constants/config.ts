import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().transform(Number).default('4000'),
  DATABASE_URL: z.string().url(),
  BASE_URL: z.string().url().default('http://localhost:4000'),
  FRONTEND_BASE_URL: z.string().url().default('http://localhost:3000'),
  AUTH_ACCESS_TOKEN_SECRET: z.string().default('Y0uR_53Cr3T_K3y'),
  AUTH_ACCESS_TOKEN_EXPIRES_IN_SECONDS: z.string().transform(Number).default('900'),
  AUTH_REFRESH_TOKEN_SECRET: z.string().default('y0Ur_R3Fr35h_53cR3t_k3Y'),
  AUTH_REFRESH_TOKEN_EXPIRES_IN_SECONDS: z.string().transform(Number).default('604800'),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.string().transform(Number),
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),
  ENCRYPTION_SECRET: z.string().default('Y0uR_3NcRyPt10N_53Cr3T'),
  CLOUDINARY_URL: z.string(),
  REDIRECT_URL_RECOVER_PASSWORD: z.string().default('/recover-password'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formatedErrorMessages = parsedEnv.error.errors
    .map((error) => {
      return `Error in ${error.path.join('.')} - ${error.message}`;
    })
    .join('\n');
  console.error('❌ Invalid environment variables:');
  console.error(formatedErrorMessages);
  console.error('Please check your .env file or environment variables.');
  console.error('Tip: You can use the .env.sample file as a reference.');

  process.exit(1);
}

const env = parsedEnv.data;

export const CONFIG = {
  app: {
    env: env.NODE_ENV,
    port: env.PORT,
    baseUrl: env.BASE_URL,
    frontendBaseUrl: env.FRONTEND_BASE_URL,
  },
  auth: {
    accessSecret: env.AUTH_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: env.AUTH_ACCESS_TOKEN_EXPIRES_IN_SECONDS,
    refreshSecret: env.AUTH_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: env.AUTH_REFRESH_TOKEN_EXPIRES_IN_SECONDS,
  },
  mail: {
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    user: env.MAIL_USER,
    password: env.MAIL_PASSWORD,
  },
  encryption: {
    secret: env.ENCRYPTION_SECRET,
  },
  redirects: {
    recoverPassword: env.REDIRECT_URL_RECOVER_PASSWORD,
  },
};
