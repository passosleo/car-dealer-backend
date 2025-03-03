import { Role } from '../../roles/entities/role-entity';

interface CreateProfileData {
  profileId?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles: Role[];
}

export class Profile {
  public readonly profileId: string;
  public name: string;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public roles: Role[];

  constructor(data: CreateProfileData) {
    this.profileId = data.profileId!;
    this.name = data.name;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.roles = data.roles;
  }

  public static create(data: CreateProfileData): Profile {
    return new Profile(data);
  }
}
