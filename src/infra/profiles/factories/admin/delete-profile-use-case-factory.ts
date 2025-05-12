import { DeleteProfileUseCase } from '../../../../application/profiles/use-cases/admin/delete-profile-use-case';
import { ProfileRepositoryPrisma } from '../../repositories/profile-repository-prisma';

export class DeleteProfileUseCaseFactory {
  public static create(): DeleteProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new DeleteProfileUseCase(profileRepository);
  }
}
