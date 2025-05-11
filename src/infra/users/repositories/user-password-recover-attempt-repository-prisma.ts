import { prisma } from '../../../../shared/db';
import { UserPasswordRecoverAttempt } from '../../../../../domain/admin/users/entities/user-password-recover-attempt-entity';
import { UserPasswordRecoverAttemptMapper } from '../../mappers/user-password-recover-attempt-mapper-prisma';
import { IUserPasswordRecoverAttemptRepository } from '../../../../../domain/admin/users/repositories/user-password-recover-attempt-repository';

export class UserPasswordRecoverAttemptRepositoryPrisma implements IUserPasswordRecoverAttemptRepository {
  public async create(data: UserPasswordRecoverAttempt): Promise<UserPasswordRecoverAttempt> {
    const attempt = await prisma.userPasswordRecoverAttempt.create({
      data: UserPasswordRecoverAttemptMapper.toPrisma(data),
    });
    return UserPasswordRecoverAttemptMapper.toDomain(attempt);
  }

  public async update(id: string, data: Partial<UserPasswordRecoverAttempt>): Promise<UserPasswordRecoverAttempt> {
    const attempt = await prisma.userPasswordRecoverAttempt.update({
      where: { attemptId: id },
      data: UserPasswordRecoverAttemptMapper.toPartialPrisma(data),
    });
    return UserPasswordRecoverAttemptMapper.toDomain(attempt);
  }

  public async delete(id: string): Promise<void> {
    await prisma.userPasswordRecoverAttempt.delete({ where: { attemptId: id } });
  }

  public async findById(id: string): Promise<UserPasswordRecoverAttempt | null> {
    const attempt = await prisma.userPasswordRecoverAttempt.findUnique({ where: { attemptId: id } });
    return attempt ? UserPasswordRecoverAttemptMapper.toDomain(attempt) : null;
  }

  public async findByUserId(userId: string): Promise<UserPasswordRecoverAttempt | null> {
    const attempt = await prisma.userPasswordRecoverAttempt.findUnique({ where: { userId } });
    return attempt ? UserPasswordRecoverAttemptMapper.toDomain(attempt) : null;
  }

  public async list(): Promise<UserPasswordRecoverAttempt[]> {
    const attempts = await prisma.userPasswordRecoverAttempt.findMany();
    return attempts.map(UserPasswordRecoverAttemptMapper.toDomain);
  }
}
