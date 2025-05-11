import { Profile } from '../../../domain/admin/profiles/entities/profile-entity';
import { IProfileRepository, ListProfilesParams } from '../../../domain/admin/profiles/repositories/profile-repository';
import { Paginated } from './../../../infra/shared/types/generic.d';

export const ProfileRepositoryMock: jest.Mocked<IProfileRepository> = {
  create: jest.fn<Promise<Profile>, [Profile]>(),
  update: jest.fn<Promise<Profile>, [string, Partial<Profile>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Profile | null>, [string]>(),
  findByIds: jest.fn<Promise<Profile[]>, [string[]]>(),
  findByName: jest.fn<Promise<Profile | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Profile>>, [ListProfilesParams]>(),
};
