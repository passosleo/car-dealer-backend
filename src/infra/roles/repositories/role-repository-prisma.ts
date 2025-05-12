import { Role } from '../../../domain/roles/entities/role-entity';
import { IRoleRepository } from '../../../domain/roles/repositories/role-repository';
import { prisma } from '../../shared/db';
import { RoleMapperPrisma } from '../mappers/role-mapper-prisma';

export class RoleRepositoryPrisma implements IRoleRepository {
  public async create(data: Role): Promise<Role> {
    const createdRole = await prisma.role.create({ data: RoleMapperPrisma.toPrisma(data) });
    return RoleMapperPrisma.toDomain(createdRole);
  }

  public async update(id: string, data: Partial<Role>): Promise<Role> {
    const updatedRole = await prisma.role.update({
      where: { roleId: id },
      data: RoleMapperPrisma.toPartialPrisma(data),
    });
    return RoleMapperPrisma.toDomain(updatedRole);
  }

  public async delete(id: string): Promise<void> {
    await prisma.role.delete({ where: { roleId: id } });
  }

  public async findById(id: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({ where: { roleId: id } });
    return role ? RoleMapperPrisma.toDomain(role) : null;
  }

  public async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await prisma.role.findMany({ where: { roleId: { in: ids } } });
    return roles.map(RoleMapperPrisma.toDomain);
  }

  public async findByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({ where: { name } });
    return role ? RoleMapperPrisma.toDomain(role) : null;
  }

  public async list(): Promise<Role[]> {
    const role = await prisma.role.findMany();
    return role.map(RoleMapperPrisma.toDomain);
  }
}
