import { DeleteProfileUseCase } from '../../../../application/admin/use-cases/profiles/delete-profile-use-case';
import { ProfileRepositoryPrisma } from '../../data/repositories/profile-repository-prisma';

export class DeleteProfileUseCaseFactory {
  public static create(): DeleteProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new DeleteProfileUseCase(profileRepository);
  }
}
