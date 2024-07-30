import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stream, StreamDocument } from './stream.schema';
import { CreateStreamDto, UpdateStreamDto } from './dto/stream.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CustomMetrics } from '../metrics/custom.metrics';

@Injectable()
export class StreamsService {
  constructor(
    @InjectModel(Stream.name) private streamModel: Model<StreamDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly metrics: CustomMetrics,
  ) {}

  async create(createStreamDto: CreateStreamDto): Promise<Stream> {
    const createdStream = new this.streamModel(createStreamDto);
    this.logger.info(`Stream created: ${createdStream._id}`);
    return createdStream.save();
  }

  async findAll(): Promise<Stream[]> {
    return this.streamModel.find().exec();
  }

  async findOne(id: string): Promise<Stream> {
    return this.streamModel.findById(id).exec();
  }

  async update(id: string, updateStreamDto: UpdateStreamDto): Promise<Stream> {
    this.logger.info(`Updating stream: ${id}`);
    return this.streamModel
      .findByIdAndUpdate(id, updateStreamDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Stream> {
    this.logger.info(`Removing stream: ${id}`);
    return this.streamModel.findByIdAndDelete(id).exec();
  }

  async startStream(id: string): Promise<Stream> {
    this.logger.info(`Starting stream: ${id}`);
    const stream = await this.streamModel
      .findByIdAndUpdate(id, { isLive: true }, { new: true })
      .exec();
    this.metrics.setActiveStreams(await this.countActiveStreams());
    return stream;
  }

  async endStream(id: string): Promise<Stream> {
    this.logger.info(`Ending stream: ${id}`);
    const stream = await this.streamModel
      .findByIdAndUpdate(
        id,
        { isLive: false, endedAt: new Date() },
        { new: true },
      )
      .exec();
    this.metrics.setActiveStreams(await this.countActiveStreams());
    return stream;
  }

  async incrementViewerCount(id: string): Promise<Stream> {
    return this.streamModel
      .findByIdAndUpdate(id, { $inc: { viewerCount: 1 } }, { new: true })
      .exec();
  }

  async decrementViewerCount(id: string): Promise<Stream> {
    return this.streamModel
      .findByIdAndUpdate(id, { $inc: { viewerCount: -1 } }, { new: true })
      .exec();
  }

  private async countActiveStreams(): Promise<number> {
    return this.streamModel.countDocuments({ isLive: true }).exec();
  }
}
