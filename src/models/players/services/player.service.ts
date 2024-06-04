import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto, UpdatePlayerDto } from '../dto';
import { InjectRepository } from 'nestjs/typeorm';
import { PlayersEntity } from '../entities/players.entity';
import { Repository } from 'typeorm'

@Injectable()
export class PlayersService {
    constructor (@InjectRepository(PlayersEntity) private readonly playerRepository: Repository<PlayersEntity>)
    {}

    async create(createPlayerDto: CreatePlayerDto) {
        const player = this.playerRepository.create(createPlayerDto);
        return await this.playerRepository.save(player);
    }

    async findAll()
    {
        return await this.playerRepository.find();
    }

     async findOne(id: number) {
    const author = await this.playerRepository.findOneBy({ id });

    if (!author) throw new NotFoundException(`Author with id ${id} not found`);

    return author;
  }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        const player = await this.playerRepository.preload({
            id: +id,
            ...updatePlayerDto
        });

        if (!player) throw new NotFoundException(`Player with id ${id} not found`);

        return await this.playerRepository.save(player);
    }

    async remove(id: number) {
        const player = await this.playerRepository.findOneBy({ id });

        if (!player) throw new NotFoundException(`Player with id ${id} not found`);

        return await this.playerRepository.remove(player);
    }

}