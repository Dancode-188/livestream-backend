import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stream, StreamDocument } from './stream.schema';
import { CreateStreamDto, UpdateStreamDto } from './dto/stream.dto';

@Injectable()
export class StreamsService {
  constructor(
    @InjectModel(Stream.name) private streamModel: Model<StreamDocument>,
  ) {}

  async create(createStreamDto: CreateStreamDto): Promise<Stream> {
    const createdStream = new this.streamModel(createStreamDto);
    return createdStream.save();
  }

  async findAll(): Promise<Stream[]> {
    return this.streamModel.find().exec();
  }

  async findOne(id: string): Promise<Stream> {
    return this.streamModel.findById(id).exec();
  }

  async update(id: string, updateStreamDto: UpdateStreamDto): Promise<Stream> {
    return this.streamModel
      .findByIdAndUpdate(id, updateStreamDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Stream> {
    return this.streamModel.findByIdAndDelete(id).exec();
  }

  async startStream(id: string): Promise<Stream> {
    return this.streamModel
      .findByIdAndUpdate(id, { isLive: true }, { new: true })
      .exec();
  }

  async endStream(id: string): Promise<Stream> {
    return this.streamModel
      .findByIdAndUpdate(
        id,
        { isLive: false, endedAt: new Date() },
        { new: true },
      )
      .exec();
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
}
