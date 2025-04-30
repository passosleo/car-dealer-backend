export const CONFIG = {
  app: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    frontendBaseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  },
  auth: {
    accessSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'Y0uR_53Cr3T_K3y',
    accessTokenExpiresIn: Number(process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN_SECONDS || 900),
    refreshSecret: process.env.AUTH_REFRESH_TOKEN_SECRET || 'y0Ur_R3Fr35h_53cR3t_k3Y',
    refreshTokenExpiresIn: Number(process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN_SECONDS || 604800),
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
  encryption: {
    secret: process.env.ENCRYPTION_SECRET || 'Y0uR_3NcRyPt10N_53Cr3T',
  },
  redirects: {
    recoverPassword: process.env.REDIRECT_URL_RECOVER_PASSWORD || '/recover-password',
  },
};
