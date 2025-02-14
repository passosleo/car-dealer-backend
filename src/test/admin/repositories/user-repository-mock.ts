import { Paginated } from './../../../infra/shared/types/generic.d';
import { User } from '../../../domain/admin/entities/user-entity';
import { IUserRepository, ListUsersParams } from '../../../domain/admin/repositories/user-repository';

export const UserRepositoryMock: jest.Mocked<IUserRepository> = {
  list: jest.fn<Promise<Paginated<User>>, [ListUsersParams]>(),
  findById: jest.fn<Promise<User | null>, [string]>(),
  findByEmail: jest.fn<Promise<User | null>, [string]>(),
  create: jest.fn<Promise<User>, [User]>(),
  update: jest.fn<Promise<User>, [string, Partial<User>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
};
