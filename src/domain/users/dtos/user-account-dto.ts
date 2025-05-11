import { Profile } from '../../profiles/entities/profile-entity';

export class UserAccountDTO {
  constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly passwordChangedAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly active: boolean,
    public readonly profile: Profile,
  ) {}

  public static create(data: UserAccountDTO) {
    return new UserAccountDTO(
      data.userId,
      data.firstName,
      data.lastName,
      data.email,
      data.passwordChangedAt,
      data.createdAt,
      data.updatedAt,
      data.active,
      data.profile,
    );
  }
}
