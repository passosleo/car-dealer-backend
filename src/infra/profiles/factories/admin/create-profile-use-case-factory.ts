import { CreateProfileUseCase } from '../../../../application/admin/profiles/use-cases/create-profile-use-case';
import { ProfileRepositoryPrisma } from '../repositories/profile-repository-prisma';
import { RoleRepositoryPrisma } from '../../roles/data/repositories/role-repository-prisma';

export class CreateProfileUseCaseFactory {
  public static create(): CreateProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    const roleRepository = new RoleRepositoryPrisma();
    return new CreateProfileUseCase(profileRepository, roleRepository);
  }
}
