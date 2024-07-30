import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CustomMetrics } from '../metrics/custom.metrics';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly metrics: CustomMetrics,
  ) {}

  @Post()
  async create(@Body() createUserDto: { username: string; password: string }) {
    this.logger.info(`Creating new user: ${createUserDto.username}`);
    this.metrics.incrementHttpRequests();
    return this.usersService.create(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string) {
    this.logger.info(`Fetching user: ${username}`);
    this.metrics.incrementHttpRequests();
    return this.usersService.findOne(username);
  }
}
