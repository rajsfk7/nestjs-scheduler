import { Test, TestingModule } from '@nestjs/testing';
import { TaskcronService } from './taskcron.service';

describe('TaskcronService', () => {
  let service: TaskcronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskcronService],
    }).compile();

    service = module.get<TaskcronService>(TaskcronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
