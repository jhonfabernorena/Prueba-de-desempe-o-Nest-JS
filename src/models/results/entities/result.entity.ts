import { PlayersEntity } from "src/models/players/entities/players.entity";
import { Column, DeleteDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class ResultsEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    score: string;

    @OneToOne(() => PlayersEntity, player => player.username)
    @JoinColumn({name: 'playerId'})
    player : PlayersEntity;

    @DeleteDateColumn()
    deletedAt: Date;
}