import { Module } from '@nestjs/common';
import { PlayersService } from './services/player.service';
import { PlayersController } from './controllers/player.controller';

@Module({
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}