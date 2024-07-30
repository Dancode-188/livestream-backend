import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { WsJwtAuthGuard } from '../auth/ws-jwt-auth.guard';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() streamId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(streamId);
    const messages = await this.chatService.getMessagesByStream(streamId);
    client.emit('previousMessages', messages);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() streamId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(streamId);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    @MessageBody() data: { streamId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    const message = await this.chatService.createMessage(
      user._id,
      data.streamId,
      data.content,
    );
    this.server.to(data.streamId).emit('newMessage', message);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @MessageBody() data: { messageId: string; streamId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    const message = await this.chatService.findMessageById(data.messageId);

    if (!message) {
      client.emit('error', 'Message not found');
      return;
    }

    // Check if the user is the message author or has admin rights
    if (message.user.toString() !== user._id && user.role !== 'admin') {
      client.emit('error', 'You do not have permission to delete this message');
      return;
    }

    const deletedMessage = await this.chatService.deleteMessage(data.messageId);
    if (deletedMessage) {
      this.server.to(data.streamId).emit('messageDeleted', data.messageId);
    }
  }
}
