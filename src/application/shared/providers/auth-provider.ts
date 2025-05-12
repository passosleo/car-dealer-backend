import { UserAccountDTO } from '../../../domain/users/dtos/user-account-dto';

export interface IAuthProvider {
  getAuthenticatedUser(): UserAccountDTO;
}

export class AuthProvider implements IAuthProvider {
  private readonly userAccount: UserAccountDTO;

  constructor(userAccount: UserAccountDTO) {
    this.userAccount = userAccount;
  }

  public getAuthenticatedUser(): UserAccountDTO {
    return this.userAccount;
  }
}
