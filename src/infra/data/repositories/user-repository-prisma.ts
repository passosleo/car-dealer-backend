import { User } from '../../../domain/entities/user-entity';
import { IUserRepository } from '../../../domain/repositories/user-repository';

export class UserRepositoryPrisma implements IUserRepository {
  create(data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
