import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CustomMetrics } from '../metrics/custom.metrics';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly metrics: CustomMetrics,
  ) {}

  async createMessage(
    userId: string,
    streamId: string,
    content: string,
  ): Promise<Message> {
    this.logger.info(`New message created for stream: ${streamId}`);
    const newMessage = new this.messageModel({
      user: userId,
      stream: streamId,
      content,
    });
    return newMessage.save();
  }

  async getMessagesByStream(streamId: string): Promise<Message[]> {
    this.logger.info(`Fetching messages for stream: ${streamId}`);
    return this.messageModel
      .find({ stream: streamId, isDeleted: false })
      .populate('user', 'username')
      .sort({ createdAt: 1 })
      .exec();
  }

  async findMessageById(messageId: string): Promise<Message> {
    return this.messageModel.findById(messageId).exec();
  }

  async deleteMessage(messageId: string): Promise<Message> {
    this.logger.info(`Deleting message: ${messageId}`);
    return this.messageModel
      .findByIdAndUpdate(messageId, { isDeleted: true }, { new: true })
      .exec();
  }
}
