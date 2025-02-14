import { Role as RolePrisma } from '@prisma/client';
import { Role } from '../../../../domain/admin/entities/role-entity';

export class RoleMapperPrisma {
  public static toDomain(data: RolePrisma): Role {
    return Role.create(data);
  }

  public static toPrisma(data: Role): RolePrisma {
    return {
      roleId: data.roleId,
      name: data.name,
      label: data.label,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<Role>): Partial<RolePrisma> {
    return {
      roleId: data.roleId,
      name: data.name,
      label: data.label,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
