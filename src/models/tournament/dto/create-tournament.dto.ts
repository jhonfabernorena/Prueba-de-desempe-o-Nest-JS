import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';


export class CreateTournamentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
   readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
   readonly description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
   readonly awards: Number;
}