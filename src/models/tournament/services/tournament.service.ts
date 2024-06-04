import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tournamentEntity } from '../entities/tournament.entity';
import { Repository } from 'typeorm'
import { PlayersEntity } from 'src/models/players/entities/players.entity';

Injectable()
export class TournamentService{

   constructor(
    @InjectRepository(tournamentEntity)
    private readonly tournamentRepository: Repository<tournamentEntity>,
    @InjectRepository(PlayersEntity)
    private readonly playersRepository: Repository<PlayersEntity>,
  ) {}

    async create(CreateTournamentDto: CreateTournamentDto){
        const tournament = this.tournamentRepository.create(CreateTournamentDto);
        return await this.tournamentRepository.save(tournament);
    }

   async findAll()
    {
        return await this.tournamentRepository.find();
    }

    async findOne(id: number){ 
     const tournament = await this.tournamentRepository.findOneBy({id})

     if (!tournament) throw new NotFoundException(`Tournament with id ${id} not found`);

     return tournament;

    }

    async update(id: number, updateTournamentDto: UpdateTournamentDto){
        const tournament = await this.tournamentRepository.preload({
            id: id,
            ...updateTournamentDto
        })

        if (!tournament) throw new NotFoundException(`Tournament with id ${id} not found`);

        return await this.tournamentRepository.save(tournament);
    }

    async remove(id: number){
        const tournament = await this.tournamentRepository.findOneBy({id})

        if (!tournament) throw new NotFoundException(`Tournament with id ${id} not found`);

        return await this.tournamentRepository.remove(tournament);

    }

    async addPlayerToTournament(tournamentId: number, playerId: number){

        const tournament = await this.tournamentRepository.findOneBy({id: tournamentId});

        if (!tournament) throw new NotFoundException(`Tournament with id ${tournamentId} not found`);

        const player = await this.playersRepository.findOneBy({id: playerId});

        if (!player) throw new NotFoundException(`Player with id ${playerId} not found`);

        tournament.participants = [...tournament.participants, player];

        return await this.tournamentRepository.save(tournament);

}


}
