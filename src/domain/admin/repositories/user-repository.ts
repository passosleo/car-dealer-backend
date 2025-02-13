import { Paginated } from '../../../infra/shared/types/generic';
import { User } from '../entities/user-entity';

export type ListUsersParams = {
  page?: number;
  limit?: number;
};

export interface IUserRepository {
  create(data: User): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  list(data: ListUsersParams): Promise<Paginated<User>>;
}
