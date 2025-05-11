import { UserPasswordRecoverAttempt } from '../../../domain/admin/users/entities/user-password-recover-attempt-entity';
import { IUserPasswordRecoverAttemptRepository } from '../../../domain/admin/users/repositories/user-password-recover-attempt-repository';

export const UserPasswordRecoverAttemptRepositoryMock: jest.Mocked<IUserPasswordRecoverAttemptRepository> = {
  list: jest.fn<Promise<UserPasswordRecoverAttempt[]>, []>(),
  findById: jest.fn<Promise<UserPasswordRecoverAttempt | null>, [string]>(),
  findByUserId: jest.fn<Promise<UserPasswordRecoverAttempt | null>, [string]>(),
  create: jest.fn<Promise<UserPasswordRecoverAttempt>, [UserPasswordRecoverAttempt]>(),
  update: jest.fn<Promise<UserPasswordRecoverAttempt>, [string, Partial<UserPasswordRecoverAttempt>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
};
