import { Paginated } from '../../infra/types/generic';
import { User } from '../entities/user-entity';
import { ListUsersParams } from './user-repository.types';

export interface IUserRepository {
  create(data: User): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  list(data: ListUsersParams): Promise<Paginated<User>>;
}
