interface CreateUserPasswordRecoverAttemptData {
  attemptId?: string;
  userId: string;
  attemptCount?: number;
  lastAttemptAt?: Date;
  blockedUntil?: Date | null;
  token: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class UserPasswordRecoverAttempt {
  attemptId: string;
  userId: string;
  attemptCount: number;
  lastAttemptAt: Date;
  blockedUntil: Date | null;
  token: string;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(data: CreateUserPasswordRecoverAttemptData) {
    this.attemptId = data.attemptId!;
    this.userId = data.userId;
    this.attemptCount = data.attemptCount ?? 1;
    this.lastAttemptAt = data.lastAttemptAt ?? new Date();
    this.blockedUntil = data.blockedUntil ?? null;
    this.token = data.token;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? null;
  }

  public static create(data: CreateUserPasswordRecoverAttemptData): UserPasswordRecoverAttempt {
    return new UserPasswordRecoverAttempt(data);
  }
}
