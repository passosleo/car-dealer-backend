import { UserPasswordRecoverAttempt } from '../entities/user-password-recover-attempt-entity';

export interface IUserPasswordRecoverAttemptRepository {
  create(data: UserPasswordRecoverAttempt): Promise<UserPasswordRecoverAttempt>;
  update(id: string, data: Partial<UserPasswordRecoverAttempt>): Promise<UserPasswordRecoverAttempt>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<UserPasswordRecoverAttempt | null>;
  findByUserId(userId: string): Promise<UserPasswordRecoverAttempt | null>;
  list(): Promise<UserPasswordRecoverAttempt[]>;
}
