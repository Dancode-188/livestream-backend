import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StreamsService } from './streams.service';
import { CreateStreamDto, UpdateStreamDto } from './dto/stream.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStreamDto: CreateStreamDto) {
    return this.streamsService.create(createStreamDto);
  }

  @Get()
  findAll() {
    return this.streamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStreamDto: UpdateStreamDto) {
    return this.streamsService.update(id, updateStreamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streamsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/start')
  startStream(@Param('id') id: string) {
    return this.streamsService.startStream(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/end')
  endStream(@Param('id') id: string) {
    return this.streamsService.endStream(id);
  }
}
