import { Injectable } from '@nestjs/common';
import { Counter, Gauge } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class CustomMetrics {
  constructor(
    @InjectMetric('http_requests_total')
    private httpRequestsCounter: Counter<string>,
    @InjectMetric('active_streams') private activeStreamsGauge: Gauge<string>,
  ) {}

  incrementHttpRequests() {
    this.httpRequestsCounter.inc();
  }

  setActiveStreams(count: number) {
    this.activeStreamsGauge.set(count);
  }
}
