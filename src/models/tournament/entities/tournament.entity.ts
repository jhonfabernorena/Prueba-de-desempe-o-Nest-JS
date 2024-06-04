import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { PlayersEntity } from '../../players/entities/players.entity';

@Entity()
export class tournamentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToMany(() => PlayersEntity)
  @JoinTable()
  participants: PlayersEntity[];
}
