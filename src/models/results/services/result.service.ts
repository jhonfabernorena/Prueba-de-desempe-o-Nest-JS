import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto, UpdateResultDto } from '../dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { ResultsEntity } from '../entities/result.entity'; 
import { Repository } from 'typeorm';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(ResultsEntity)
    private readonly resultRepository: Repository<ResultsEntity>,
  ) {}

  async create(CreateResultDto: CreateResultDto) {
    const result = this.resultRepository.create();
    await this.resultRepository.save(result);
    return result;
  }


  async findAll() {
}

  async findOne(id: number) {
    const result = await this.resultRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(`Result with id ${id} not found`);
    return result;
  }

  async update(id: string, updateResultDto: UpdateResultDto) {
    const result = await this.resultRepository.preload({
      id: +id,
      ...updateResultDto
    });
    if (!result) throw new NotFoundException(`Result with id ${id} not found`);
    return await this.resultRepository.save(result);
  }

  async remove(id: number) {
    const result = await this.resultRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(`Result with id ${id} not found`);
    return await this.resultRepository.remove(result);
  }
}
