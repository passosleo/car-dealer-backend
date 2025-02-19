import { ListProfilesUseCase } from '../../../../application/admin/use-cases/profiles/list-profiles-use-case';
import { ProfileRepositoryPrisma } from '../../data/repositories/profile-repository-prisma';

export class ListProfilesUseCaseFactory {
  public static create(): ListProfilesUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new ListProfilesUseCase(profileRepository);
  }
}
