import { Role } from '../../domain/roles/entities/role-entity';
import { IRoleRepository } from '../../domain/roles/repositories/role-repository';

export const RoleRepositoryMock: jest.Mocked<IRoleRepository> = {
  create: jest.fn<Promise<Role>, [Role]>(),
  update: jest.fn<Promise<Role>, [string, Partial<Role>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Role | null>, [string]>(),
  findByIds: jest.fn<Promise<Role[]>, [string[]]>(),
  findByName: jest.fn<Promise<Role | null>, [string]>(),
  list: jest.fn<Promise<Role[]>, []>(),
};
