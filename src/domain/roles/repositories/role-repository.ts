import { Role } from '../entities/role-entity';

export interface IRoleRepository {
  create(data: Role): Promise<Role>;
  update(id: string, data: Partial<Role>): Promise<Role>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Role | null>;
  findByIds(ids: string[]): Promise<Role[]>;
  findByName(name: string): Promise<Role | null>;
  list(): Promise<Role[]>;
}
