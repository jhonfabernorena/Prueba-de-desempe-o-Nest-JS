import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from './models/players/controllers/player.controller';
import { PlayersEntity } from './models/players/entities/players.entity';
import { PlayersService } from './models/players/services/player.service';
import { TournamentController } from './models/tournament/controllers/tournament.controller';
import { tournamentEntity } from './models/tournament/entities/tournament.entity';
import { TournamentService } from './models/tournament/services/tournament.service';
import { ResultsController } from './models/results/controller/result.controller';
import { ResultsEntity } from './models/results/entities/result.entity';
import { ResultsService } from './models/results/services/result.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
      entities: [PlayersEntity, tournamentEntity, ResultsEntity],
      extra: {
        ssl: true, 
      },
    }),
    TypeOrmModule.forFeature([PlayersEntity, tournamentEntity, ResultsEntity]),
  ],
  controllers: [PlayersController, TournamentController, ResultsController],
  providers: [PlayersService, TournamentService, ResultsService],
})
export class AppModule {}
