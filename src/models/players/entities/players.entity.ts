// import {resultEntity} from "src/models/result/entities/result.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PlayersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

   // @OneToMany(() => resultEntity, (result) => result)
    // results: resultEntity[]
}