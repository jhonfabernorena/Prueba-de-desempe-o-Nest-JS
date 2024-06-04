import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from './models/players/controllers/player.controller';
import { PlayersEntity } from './models/players/entities/players.entity';
import { PlayersService } from './models/players/services/player.service';

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
      entities: [PlayersEntity],
      extra: {
        ssl: true, 
      },
    }),
    TypeOrmModule.forFeature([PlayersEntity]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class AppModule {}
