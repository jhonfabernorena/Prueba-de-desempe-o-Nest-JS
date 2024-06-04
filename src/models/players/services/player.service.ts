import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto, FilterDto, UpdatePlayerDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersEntity } from '../entities/players.entity';
import { ILike, Repository } from 'typeorm'

@Injectable()
export class PlayersService {
    constructor (@InjectRepository(PlayersEntity) private readonly playerRepository: Repository<PlayersEntity>)
    {}

    async create(CreatePlayerDto: CreatePlayerDto) {
        const player = this.playerRepository.create(CreatePlayerDto);
        return await this.playerRepository.save(player);
    }
    

    async findAll()
    {
        return await this.playerRepository.find();
    }
      async findAllPlayerFilter({
    limit,
    offset,
    search,
    sortBy,
    order,
  }: FilterDto): Promise<PlayersEntity[]> {
    return await this.playerRepository.find({
      where: {
        username: ILike(`%${search}%`),
      },
      order: {
        [sortBy]: order,
      },
      skip: offset,
      take: limit,
    });
  }

     async findOne(id: number) {
    const player = await this.playerRepository.findOneBy({ id });

    if (!player) throw new NotFoundException(`Author with id ${id} not found`);

    return player;
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