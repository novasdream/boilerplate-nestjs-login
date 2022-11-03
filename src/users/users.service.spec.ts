import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return john user', () => {
    expect(service.findOne('john')).resolves.toStrictEqual({
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: ['admin'],
    });
  });

  it('should be undefined', () => {
    expect(service.findOne('NotExistingOne')).resolves.toBeUndefined();
  });

  it('should register to be successfull', () => {
    service.register('teste', 'teste').then(() => {
      expect(service.findOne('teste')).resolves.toBeDefined();
    });
  });
});
