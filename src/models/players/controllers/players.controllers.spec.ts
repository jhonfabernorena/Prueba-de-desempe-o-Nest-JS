import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from '../controllers/player.controller';
import {PlayersService} from '../services/player.service';

describe("playerController", () => {
    let controller: PlayersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayersController],
            providers: [PlayersService],
        }).compile();

        controller = module.get<PlayersController>(PlayersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })
})
