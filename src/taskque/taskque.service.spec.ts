import { Test, TestingModule } from '@nestjs/testing';
import { TaskqueService } from './taskque.service';

describe('TaskqueService', () => {
  let service: TaskqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskqueService],
    }).compile();

    service = module.get<TaskqueService>(TaskqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
