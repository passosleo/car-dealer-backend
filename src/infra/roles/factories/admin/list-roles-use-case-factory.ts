import { ListRolesUseCase } from '../../../../application/roles/use-cases/admin/list-roles-use-case';
import { RoleRepositoryPrisma } from '../../repositories/role-repository-prisma';

export class ListRolesUseCaseFactory {
  public static create(): ListRolesUseCase {
    const roleRepository = new RoleRepositoryPrisma();
    return new ListRolesUseCase(roleRepository);
  }
}
