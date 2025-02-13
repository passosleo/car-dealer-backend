export const CONFIG = {
  app: {
    port: process.env.PORT,
    baseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
  },
  auth: {
    secret: process.env.AUTH_SECRET || 'your_secret_key',
    expiresIn: Number(process.env.AUTH_EXPIRES_IN_SECONDS || 900),
    refreshSecret: process.env.AUTH_REFRESH_SECRET || 'your_refresh_secret_key',
    refreshExpiresIn: Number(process.env.AUTH_REFRESH_EXPIRES_IN_SECONDS || 604800),
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
  encryption: {
    secret: process.env.ENCRYPTION_SECRET || 'your_encryption_secret',
  },
  redirects: {
    recoverPassword: process.env.REDIRECT_RECOVER_PASSWORD || 'http://localhost:3000/recover-password',
  },
};
