import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StreamDocument = Stream & Document;

@Schema({ timestamps: true })
export class Stream {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ default: false })
  isLive: boolean;

  @Prop()
  description: string;

  @Prop()
  streamKey: string;

  @Prop({ default: 0 })
  viewerCount: number;

  @Prop()
  endedAt: Date;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);
