import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from './models/players/controllers/player.controller';
import { PlayersEntity } from './models/players/entities/players.entity';
import { PlayersService } from './models/players/services/player.service';
import { TournamentController } from './models/tournament/controllers/tournament.controller';
import { tournamentEntity } from './models/tournament/entities/tournament.entity';
import { TournamentService } from './models/tournament/services/tournament.service';



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
      synchronize: true, // Aquí puedes cambiar a false en producción para desactivar la sincronización automática
      entities: [PlayersEntity, tournamentEntity],
      extra: {
        ssl: true, // Ajusta según la configuración de tu base de datos
      },
    }),
    TypeOrmModule.forFeature([PlayersEntity, tournamentEntity]),
  ],
  controllers: [PlayersController, TournamentController],
  providers: [PlayersService, TournamentService],
})
export class AppModule {}
