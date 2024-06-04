import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

ApiTags("Tournament")
@Controller('tournament')
export class TournamentController {
    constructor(private readonly TournamentService: TournamentService) {}
    
    @Post("/create")
    @ApiOperation({summary: "Create Tournament"})
     @ApiResponse({ status: 201, description: 'tournament created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
 @ApiResponse({status: 500, description: 'An internal server error occurred while creating the tournament.'})
    create(@Body() createTournamentDto: CreateTournamentDto) {
        return this.TournamentService.create(createTournamentDto);

}

    @Get("/all")
    @ApiOperation({summary: "Get all tournaments"})
    @ApiResponse({ status: 201, description: 'tournament created' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({status: 500, description: 'An internal server error occurred while creating the tournament.'})
    findAll() {
        return this.TournamentService.findAll();
    }

    @Get("/:id")
    @ApiOperation({summary: "Get tournament by id"})
    @ApiResponse({ status: 201, description: 'tournament created' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({status: 500, description: 'An internal server error occurred while creating the tournament.'})
    findOne(@Param('id') id: number) {
        return this.TournamentService.findOne(id);
    }

    @Put("/:id")
    @ApiOperation({summary: "Update tournament by id"})
    @ApiResponse({ status: 201, description: 'tournament created' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({status: 500, description: 'An internal server error occurred while creating the tournament.'})

    update(@Param('id') id: number, @Body() updateTournamentDto: UpdateTournamentDto) {
        return this.TournamentService.update(id, updateTournamentDto);
    }

    @Delete("/:id")
    @ApiOperation({summary: "Delete tournament by id"})
    @ApiResponse({ status: 201, description: 'tournament created' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({status: 500, description: 'An internal server error occurred while creating the tournament.'})

    remove(@Param('id') id: number) {
        return this.TournamentService.remove(id);
    }

    
    @Post("/:id/players")
    @ApiOperation({summary: "Add player to tournament by tournament id and player id"})
    @ApiResponse({ status: 201, description: 'player added to tournament' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({status: 500, description: 'An internal server error occurred while adding the player to the tournament.'})
    async addPlayerToTournament(@Param('id') tournamentId: number, @Body('playerId') playerId: number) {
        return await this.TournamentService.addPlayerToTournament(tournamentId, playerId);
    }
}
