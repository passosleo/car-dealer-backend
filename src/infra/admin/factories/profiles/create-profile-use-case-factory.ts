import { CreateProfileUseCase } from '../../../../application/admin/use-cases/profiles/create-profile-use-case';
import { ProfileRepositoryPrisma } from '../../data/repositories/profile-repository-prisma';
import { RoleRepositoryPrisma } from '../../data/repositories/role-repository-prisma';

export class CreateProfileUseCaseFactory {
  public static create(): CreateProfileUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    const roleRepository = new RoleRepositoryPrisma();
    return new CreateProfileUseCase(profileRepository, roleRepository);
  }
}
