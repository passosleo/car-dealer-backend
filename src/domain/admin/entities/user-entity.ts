import { Profile } from './profile-entity';

export interface CreateUserData {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
  profile: Profile;
}

export class User {
  public readonly userId: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public passwordChangedAt: Date | null;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public active: boolean;
  public profile: Profile;

  public constructor(data: CreateUserData) {
    this.userId = data.userId!;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.passwordChangedAt = data.passwordChangedAt ?? null;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.active = data.active ?? true;
    this.profile = data.profile;
  }

  public static create(data: CreateUserData): User {
    return new User(data);
  }
}
