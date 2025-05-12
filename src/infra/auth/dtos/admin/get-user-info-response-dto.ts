import { UserAccountDTO } from '../../../../domain/users/dtos/user-account-dto';

export class GetUserInfoResponseDTO {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly active: boolean,
    public readonly profile: {
      name: string;
      roles: string[];
    },
  ) {}

  public static fromUserAccountDTO(data: UserAccountDTO): GetUserInfoResponseDTO {
    return new GetUserInfoResponseDTO(data.firstName, data.lastName, data.email, data.active, {
      name: data.profile.name,
      roles: data.profile.roles.map((role) => role.name),
    });
  }
}
