import { createServer } from './infra/http/server';

function bootstrap() {
  const app = createServer();
  const port = Number(process.env.PORT) || 4000;

  app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening at ${address}`);
  });
}

bootstrap();
