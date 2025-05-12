import { IAuthProvider } from '../../../application/shared/providers/auth-provider';
import { UserAccountDTO } from '../../../domain/users/dtos/user-account-dto';

export const AuthProviderMock: jest.Mocked<IAuthProvider> = {
  getAuthenticatedUser: jest.fn<UserAccountDTO, []>(),
};
