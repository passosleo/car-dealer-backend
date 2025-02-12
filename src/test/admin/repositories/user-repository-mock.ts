import { IUserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/entities/user-entity';

export const UserRepositoryMock: jest.Mocked<IUserRepository> = {
  list: jest.fn<Promise<User[]>, []>(),
  findById: jest.fn<Promise<User | null>, [string]>(),
  findByEmail: jest.fn<Promise<User | null>, [string]>(),
  create: jest.fn<Promise<User>, [User]>(),
  update: jest.fn<Promise<User>, [string, Partial<User>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
};
