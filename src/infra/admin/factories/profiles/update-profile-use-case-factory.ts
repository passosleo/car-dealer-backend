import { UpdateProfileUseCase } from '../../../../application/admin/use-cases/profiles/update-profile-use-case';
import { ProfileRepositoryPrisma } from '../../data/repositories/profile-repository-prisma';
import { RoleRepositoryPrisma } from '../../data/repositories/role-repository-prisma';

export class UpdateProfileUseCaseFactory {
  public static create(): UpdateProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    const roleRepository = new RoleRepositoryPrisma();
    return new UpdateProfileUseCase(profileRepository, roleRepository);
  }
}
