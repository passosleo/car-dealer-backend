import { Paginated } from '../../../../infra/shared/types/generic';
import { Profile } from '../entities/profile-entity';

export type ListProfilesParams = {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  search?: string;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
};

export interface IProfileRepository {
  create(data: Profile): Promise<Profile>;
  update(id: string, data: Partial<Profile>): Promise<Profile>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Profile | null>;
  findByIds(ids: string[]): Promise<Profile[]>;
  findByName(name: string): Promise<Profile | null>;
  list(data: ListProfilesParams): Promise<Paginated<Profile>>;
}
