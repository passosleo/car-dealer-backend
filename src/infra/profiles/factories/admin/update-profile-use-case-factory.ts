import { UpdateProfileUseCase } from '../../../../application/admin/profiles/use-cases/update-profile-use-case';
import { ProfileRepositoryPrisma } from '../repositories/profile-repository-prisma';
import { RoleRepositoryPrisma } from '../../roles/data/repositories/role-repository-prisma';

export class UpdateProfileUseCaseFactory {
  public static create(): UpdateProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    const roleRepository = new RoleRepositoryPrisma();
    return new UpdateProfileUseCase(profileRepository, roleRepository);
  }
}
