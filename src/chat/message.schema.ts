import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Stream', required: true })
  stream: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
