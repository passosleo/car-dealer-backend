interface CreateUserPasswordRecoverAttemptData {
  attemptId?: string;
  userId: string;
  attemptCount?: number;
  lastAttemptAt?: Date;
  blockedUntil?: Date | null;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserPasswordRecoverAttempt {
  public readonly attemptId: string;
  public readonly userId: string;
  public attemptCount: number;
  public lastAttemptAt: Date;
  public blockedUntil: Date | null;
  public token: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(data: CreateUserPasswordRecoverAttemptData) {
    this.attemptId = data.attemptId!;
    this.userId = data.userId;
    this.attemptCount = data.attemptCount ?? 1;
    this.lastAttemptAt = data.lastAttemptAt ?? new Date();
    this.blockedUntil = data.blockedUntil ?? null;
    this.token = data.token;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateUserPasswordRecoverAttemptData): UserPasswordRecoverAttempt {
    return new UserPasswordRecoverAttempt(data);
  }
}
