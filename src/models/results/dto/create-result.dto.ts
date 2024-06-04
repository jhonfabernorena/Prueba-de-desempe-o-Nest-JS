import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateResultDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly winnerId: number;

  @ApiProperty()
  @IsNumber()
  readonly loserId: number;

  @ApiProperty()
  @IsNumber()
  readonly tournamentId: number;

 }
