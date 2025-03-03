import { ListRolesUseCase } from '../../../../application/admin/roles/use-cases/list-roles-use-case';
import { RoleRepositoryPrisma } from '../data/repositories/role-repository-prisma';

export class ListRolesUseCaseFactory {
  public static create(): ListRolesUseCase {
    const roleRepository = new RoleRepositoryPrisma();
    return new ListRolesUseCase(roleRepository);
  }
}
