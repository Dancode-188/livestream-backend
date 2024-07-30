import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      this.logger.info(`User validated: ${username}`);
      return result;
    }
    this.logger.warn(`Failed login attempt for user: ${username}`);
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    this.logger.info(`User logged in: ${user.username}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
