import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { ResultsService } from '../services/result.service';
import { CreateResultDto, UpdateResultDto } from '../dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Result")
@Controller('results')
export class ResultsController {
    constructor(private readonly ResultsService: ResultsService) {}

    @Post("/create")
    @ApiOperation({ summary: 'Create a new result' })
    @ApiResponse({ status: 201, description: 'The result has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad Request: The result could not be created.'})
    create(@Body() createResultDto: CreateResultDto) {
        return this.ResultsService.create(createResultDto);
    }

     @Get("/all")
    @ApiOperation({summary: "Get all players", description: "get all players registers in the db"})
    @ApiResponse({status: 200, description: "Players found"})
    @ApiResponse({status: 404, description: "Players not found"})
    async findAll() {
        const results = await this.ResultsService.findAll();
        
        return results;
    }

    @Get("/:id")
    @ApiOperation({summary: "Get a result by id", description: "Get a result by id"})
    @ApiResponse({status: 200, description: "Result found"})
    @ApiResponse({status: 500, description: "internal server error"})
    @ApiResponse({status: 400, description: "Bad Request: The result could not be found."})
    @ApiResponse({status: 404, description: "Result not found"})
    async findOne(@Param('id') id: number) {
        const result = await this.ResultsService.findOne(id);
        if (!result) throw new NotFoundException(`Result with id ${id} not found`);
        return result;
    }

    @Put("/:id")
    @ApiOperation({summary: "Update a result by id", description: "Update a result by id"})
    @ApiResponse({status: 200, description: "Result updated"})
    @ApiResponse({status: 500, description: "internal server error"})
    @ApiResponse({status: 404, description: "Result not found"})
    async update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
        const result = await this.ResultsService.update(id, updateResultDto);
        if (!result) throw new NotFoundException(`Result with id ${id} not found`);
        return result;
    }

    @Delete("/:id")
    @ApiOperation({summary: "Delete a result by id", description: "Delete a result by id"})
    @ApiResponse({status: 200, description: "Result deleted"})
    @ApiResponse({status: 500, description: "internal server error"})
    @ApiResponse({status: 404, description: "Result not found"})
    async remove(@Param('id') id: number) {
        const result = await this.ResultsService.remove(id);
        if (!result) throw new NotFoundException(`Result with id ${id} not found`);
        return result;
    }
}

