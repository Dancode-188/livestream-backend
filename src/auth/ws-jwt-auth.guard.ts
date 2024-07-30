// src/auth/ws-jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authToken = client.handshake.auth.token;
      const payload = this.jwtService.verify(authToken);
      client.data.user = payload;
      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
}
