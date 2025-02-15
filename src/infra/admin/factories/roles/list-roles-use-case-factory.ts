import { ListRolesUseCase } from '../../../../application/admin/use-cases/roles/list-roles-use-case';
import { RoleRepositoryPrisma } from '../../data/repositories/role-repository-prisma';

export class ListRolesUseCaseFactory {
  public static create(): ListRolesUseCase {
    const roleRepository = new RoleRepositoryPrisma();
    return new ListRolesUseCase(roleRepository);
  }
}
