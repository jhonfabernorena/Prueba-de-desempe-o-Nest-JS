import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { GameResult } from './result.entity';

@Entity()
export class PlayersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  //@OneToMany(() => GameResult, gameResult => gameResult.player)
  //gameResults: GameResult[];
}
