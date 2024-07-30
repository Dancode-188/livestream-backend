// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from './message.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    AuthModule,
  ],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
