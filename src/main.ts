import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomMetrics } from './metrics/custom.metrics';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use Winston for logging
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Enable CORS
  app.enableCors();

  // Get the CustomMetrics service
  const metricsService = app.get(CustomMetrics);

  // Use a global interceptor to count HTTP requests
  app.use((req, res, next) => {
    metricsService.incrementHttpRequests();
    next();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
