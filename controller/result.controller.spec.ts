import { Test, TestingModule } from '@nestjs/testing';
import { ResultsController } from './result.controller';
import { ResultsService } from '../services/result.service';

describe("playerController", () => {
  let controller: ResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultsController],
      providers: [ResultsService],
    }).compile();

    controller = module.get<ResultsController>(ResultsController);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })
})
