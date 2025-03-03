import { DeleteProfileUseCase } from '../../../../application/admin/profiles/use-cases/delete-profile-use-case';
import { ProfileRepositoryPrisma } from '../../profiles/data/repositories/profile-repository-prisma';

export class DeleteProfileUseCaseFactory {
  public static create(): DeleteProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new DeleteProfileUseCase(profileRepository);
  }
}
