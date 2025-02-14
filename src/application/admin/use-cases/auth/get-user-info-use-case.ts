import { GetUserInfoResponseDTO } from '../../../../infra/admin/http/dtos/auth/get-user-info-response-dto';
import { IAuthProvider } from '../../../shared/providers/auth-provider';

export class GetUserInfoUseCase {
  constructor(private readonly authProvider: IAuthProvider) {}

  public async execute(): Promise<GetUserInfoResponseDTO> {
    const authenticatedUser = this.authProvider.getAuthenticatedUser();
    return GetUserInfoResponseDTO.fromUserAccountDTO(authenticatedUser);
  }
}
