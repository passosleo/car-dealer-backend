interface CreateRoleData {
  roleId?: string;
  name: string;
  label: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Role {
  public readonly roleId: string;
  public name: string;
  public label: string;
  public description: string | null;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(data: CreateRoleData) {
    this.roleId = data.roleId!;
    this.name = data.name;
    this.label = data.label;
    this.description = data.description ?? null;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateRoleData): Role {
    return new Role(data);
  }
}
