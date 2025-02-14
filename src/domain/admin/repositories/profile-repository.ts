import { Paginated } from '../../../infra/shared/types/generic';
import { Profile } from '../entities/profile-entity';

export type ListProfilesParams = {
  page?: number;
  limit?: number;
};

export interface IUserRepository {
  create(data: Profile): Promise<Profile>;
  update(id: string, data: Partial<Profile>): Promise<Profile>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Profile | null>;
  findByEmail(email: string): Promise<Profile | null>;
  list(data: ListProfilesParams): Promise<Paginated<Profile>>;
}
