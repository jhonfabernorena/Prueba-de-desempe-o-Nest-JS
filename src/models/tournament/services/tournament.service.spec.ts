import {Test, TestingModule} from '@nestjs/testing'
import {TournamentService} from "./tournament.service";

describe('tournamentsService', () => {
    let service: TournamentService;

   beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TournamentService],
        }).compile();

        service = module.get<TournamentService>(TournamentService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })
})