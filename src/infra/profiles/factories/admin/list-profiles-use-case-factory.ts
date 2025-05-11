import { ListProfilesUseCase } from '../../../../application/admin/profiles/use-cases/list-profiles-use-case';
import { ProfileRepositoryPrisma } from '../repositories/profile-repository-prisma';

export class ListProfilesUseCaseFactory {
  public static create(): ListProfilesUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new ListProfilesUseCase(profileRepository);
  }
}
