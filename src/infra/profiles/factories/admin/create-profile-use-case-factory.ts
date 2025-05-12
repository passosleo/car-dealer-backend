import { CreateProfileUseCase } from '../../../../application/profiles/use-cases/admin/create-profile-use-case';
import { RoleRepositoryPrisma } from '../../../roles/repositories/role-repository-prisma';
import { ProfileRepositoryPrisma } from '../../repositories/profile-repository-prisma';

export class CreateProfileUseCaseFactory {
  public static create(): CreateProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    const roleRepository = new RoleRepositoryPrisma();
    return new CreateProfileUseCase(profileRepository, roleRepository);
  }
}
