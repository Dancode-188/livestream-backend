import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StreamsService } from './streams.service';

@WebSocketGateway({ namespace: 'streams' })
export class StreamGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private streamsService: StreamsService) {}

  async handleConnection(client: Socket) {
    const streamId = client.handshake.query.streamId as string;
    if (streamId) {
      client.join(streamId);
      await this.streamsService.incrementViewerCount(streamId);
      this.server
        .to(streamId)
        .emit(
          'viewerCountUpdated',
          await this.streamsService.findOne(streamId),
        );
    }
  }

  async handleDisconnect(client: Socket) {
    const streamId = client.handshake.query.streamId as string;
    if (streamId) {
      client.leave(streamId);
      await this.streamsService.decrementViewerCount(streamId);
      this.server
        .to(streamId)
        .emit(
          'viewerCountUpdated',
          await this.streamsService.findOne(streamId),
        );
    }
  }

  @SubscribeMessage('joinStream')
  async handleJoinStream(client: Socket, streamId: string) {
    client.join(streamId);
    await this.streamsService.incrementViewerCount(streamId);
    this.server
      .to(streamId)
      .emit('viewerCountUpdated', await this.streamsService.findOne(streamId));
  }

  @SubscribeMessage('leaveStream')
  async handleLeaveStream(client: Socket, streamId: string) {
    client.leave(streamId);
    await this.streamsService.decrementViewerCount(streamId);
    this.server
      .to(streamId)
      .emit('viewerCountUpdated', await this.streamsService.findOne(streamId));
  }

  @SubscribeMessage('streamMessage')
  async handleStreamMessage(
    client: Socket,
    payload: { streamId: string; message: string },
  ) {
    this.server.to(payload.streamId).emit('newStreamMessage', payload);
  }
}
