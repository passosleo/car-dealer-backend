import { ProfileResponseDTO } from '../../../profiles/http/dtos/profile-response-dto';

export class UserResponseDTO {
  constructor(
    public readonly userId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly passwordChangedAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly active: boolean,
    public readonly profile: ProfileResponseDTO,
  ) {}

  public static create(data: UserResponseDTO): UserResponseDTO {
    return new UserResponseDTO(
      data.userId,
      data.firstName,
      data.lastName,
      data.email,
      data.passwordChangedAt,
      data.createdAt,
      data.updatedAt,
      data.active,
      ProfileResponseDTO.create(data.profile),
    );
  }
}
