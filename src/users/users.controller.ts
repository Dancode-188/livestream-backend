import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: { username: string; password: string }) {
    return this.usersService.create(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
}
