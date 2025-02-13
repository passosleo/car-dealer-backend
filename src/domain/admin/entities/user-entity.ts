interface CreateUserData {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangedAt?: Date | null;
  createdAt?: Date;
  createdBy: string;
  updatedAt?: Date | null;
  updatedBy?: string | null;
  active?: boolean;
}

export class User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangedAt: Date | null;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date | null;
  updatedBy: string | null;
  active: boolean;

  constructor(data: CreateUserData) {
    this.userId = data.userId!;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.passwordChangedAt = data.passwordChangedAt ?? null;
    this.createdAt = data.createdAt ?? new Date();
    this.createdBy = data.createdBy;
    this.updatedAt = data.updatedAt ?? null;
    this.updatedBy = data.updatedBy ?? null;
    this.active = data.active ?? true;
  }

  public static create(data: CreateUserData): User {
    return new User(data);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
