import { ListProfilesUseCase } from '../../../../application/profiles/use-cases/admin/list-profiles-use-case';
import { ProfileRepositoryPrisma } from '../../repositories/profile-repository-prisma';

export class ListProfilesUseCaseFactory {
  public static create(): ListProfilesUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new ListProfilesUseCase(profileRepository);
  }
}
