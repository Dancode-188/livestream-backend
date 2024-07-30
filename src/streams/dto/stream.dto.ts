import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateStreamDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  streamKey?: string;
}

export class UpdateStreamDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isLive?: boolean;
}
