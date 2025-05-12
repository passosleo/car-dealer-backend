import { UpdateProfileUseCase } from '../../../../application/profiles/use-cases/admin/update-profile-use-case';
import { RoleRepositoryPrisma } from '../../../roles/repositories/role-repository-prisma';
import { ProfileRepositoryPrisma } from '../../repositories/profile-repository-prisma';

export class UpdateProfileUseCaseFactory {
  public static create(): UpdateProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    const roleRepository = new RoleRepositoryPrisma();
    return new UpdateProfileUseCase(profileRepository, roleRepository);
  }
}
