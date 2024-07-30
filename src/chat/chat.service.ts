import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(
    userId: string,
    streamId: string,
    content: string,
  ): Promise<Message> {
    const newMessage = new this.messageModel({
      user: userId,
      stream: streamId,
      content,
    });
    return newMessage.save();
  }

  async getMessagesByStream(streamId: string): Promise<Message[]> {
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
    return this.messageModel
      .findByIdAndUpdate(messageId, { isDeleted: true }, { new: true })
      .exec();
  }
}
