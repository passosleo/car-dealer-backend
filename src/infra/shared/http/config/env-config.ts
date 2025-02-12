export const envConfig = {
  auth: {
    secret: process.env.AUTH_SECRET || 'your_secret_key',
    expiresIn: process.env.AUTH_EXPIRES_IN_SECONDS || 900,
    refreshSecret: process.env.AUTH_REFRESH_SECRET || 'your_refresh_secret_key',
    refreshExpiresIn: process.env.AUTH_REFRESH_EXPIRES_IN_SECONDS || 604800,
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.MAIL_PORT || 2525,
    user: process.env.MAIL_USER || 'your_user',
    password: process.env.MAIL_PASSWORD || 'your_password',
  },
};
