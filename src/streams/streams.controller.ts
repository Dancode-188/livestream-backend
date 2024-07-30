import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { StreamsService } from './streams.service';
import { CreateStreamDto, UpdateStreamDto } from './dto/stream.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CustomMetrics } from '../metrics/custom.metrics';

@Controller('streams')
export class StreamsController {
  constructor(
    private readonly streamsService: StreamsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly metrics: CustomMetrics,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStreamDto: CreateStreamDto) {
    this.logger.info(`Creating new stream: ${createStreamDto.title}`);
    this.metrics.incrementHttpRequests();
    return this.streamsService.create(createStreamDto);
  }

  @Get()
  findAll() {
    this.logger.info('Fetching all streams');
    this.metrics.incrementHttpRequests();
    return this.streamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.info(`Fetching stream: ${id}`);
    this.metrics.incrementHttpRequests();
    return this.streamsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStreamDto: UpdateStreamDto) {
    this.logger.info(`Updating stream: ${id}`);
    this.metrics.incrementHttpRequests();
    return this.streamsService.update(id, updateStreamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.info(`Deleting stream: ${id}`);
    this.metrics.incrementHttpRequests();
    return this.streamsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/start')
  startStream(@Param('id') id: string) {
    this.logger.info(`Starting stream: ${id}`);
    this.metrics.incrementHttpRequests();
    return this.streamsService.startStream(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/end')
  endStream(@Param('id') id: string) {
    this.logger.info(`Ending stream: ${id}`);
    this.metrics.incrementHttpRequests();
    return this.streamsService.endStream(id);
  }
}
