import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metrics.controller';
import { CustomMetrics } from './custom.metrics';
import {
  makeCounterProvider,
  makeGaugeProvider,
} from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [MetricsController],
  providers: [
    CustomMetrics,
    makeCounterProvider({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
    }),
    makeGaugeProvider({
      name: 'active_streams',
      help: 'Number of currently active streams',
    }),
  ],
  exports: [CustomMetrics],
})
export class MetricsModule {}
