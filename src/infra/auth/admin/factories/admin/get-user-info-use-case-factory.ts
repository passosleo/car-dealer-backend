import { GetUserInfoUseCase } from '../../../../../application/auth/use-cases/admin/get-user-info-use-case';
import { AuthProvider } from '../../../../../application/shared/providers/auth-provider';
import { UserAccountDTO } from '../../../../../domain/users/dtos/user-account-dto';

export class GetUserInfoUseCaseFactory {
  public static create(user: UserAccountDTO): GetUserInfoUseCase {
    const authProvider = new AuthProvider(user);
    return new GetUserInfoUseCase(authProvider);
  }
}
