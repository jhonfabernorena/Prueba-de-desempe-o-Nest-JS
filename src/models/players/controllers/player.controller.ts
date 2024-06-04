import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { PlayersService } from '../services/player.service';
import { CreatePlayerDto, UpdatePlayerDto } from '../dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Players")
@Controller('players')
export class PlayersController {
    constructor(private readonly PlayersService: PlayersService) {}

    @Post("/create")
    @ApiOperation({summary: "Create player", description: "create a player for a tournament"})
    @ApiResponse({status: 201, description: "Player created"})
    @ApiResponse({status: 400, description: "Bad Request"})
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.PlayersService.create(createPlayerDto);
}   

    @Get("/all")
    @ApiOperation({summary: "Get all players", description: "get all players registers in the db"})
    @ApiResponse({status: 200, description: "Players found"})
    @ApiResponse({status: 404, description: "Players not found"})
    
    @Get()
    @ApiOperation({summary: "Get all players", description: "get all players registers in the db"})
    @ApiResponse({status: 200, description: "Players found"})
    @ApiResponse({status: 404, description: "Players not found"})
    async findAll() {
        const players = await this.PlayersService.findAll();

        if (players.length === 0) {
            throw new NotFoundException('No players were found in the system.');
        }
        
        return players;
    }

    @Get("/:id")
    @ApiOperation({summary: "Get player by id", description: "get a player by id"})
    @ApiResponse({status: 200, description: "Player found"})
    @ApiResponse({status: 404, description: "Player not found"})
    findOne(@Param('id') id: number) {
        return this.PlayersService.findOne(id);
    }
    
    @Put("update/:id")
    @ApiOperation({summary: "Update player by id", description: "update a player by id"})
    @ApiResponse({status: 200, description: "Player updated"})
    @ApiResponse({status: 404, description: "Player not found"})
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.PlayersService.update(id, updatePlayerDto);
    }

    @Delete("delete/:id")
    @ApiOperation({summary: "Delete player by id", description: "delete a player by id"})
    @ApiResponse({status: 200, description: "Player deleted"})
    @ApiResponse({status: 404, description: "Player not found"})
    remove(@Param('id') id: number) {
        return this.PlayersService.remove(id);
    }
    }
    

