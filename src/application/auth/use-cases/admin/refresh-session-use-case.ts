import { ITokenService } from '../../../shared/services/token-service';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { CONFIG } from '../../../../infra/shared/constants/config';
import { IUserRepository } from '../../../../domain/users/repositories/user-repository';
import { SessionResponseDTO } from '../../../../infra/auth/dtos/admin/session-response-dto';
import { RefreshSessionRequestDTO } from '../../../../infra/auth/dtos/admin/refresh-session-request-dto';

export class RefreshSessionUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
  ) {}

  public async execute(data: RefreshSessionRequestDTO): Promise<SessionResponseDTO> {
    const refreshTokenPayload = this.tokenService.verifyRefreshToken<{ id: string }>(data.refreshToken);
    const userExists = await this.userRepository.findById(refreshTokenPayload.id);
    if (!userExists) throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    const accessToken = this.tokenService.generateAccessToken({ id: userExists.userId });
    const refreshToken = this.tokenService.generateRefreshToken({ id: userExists.userId });
    return SessionResponseDTO.create({
      type: 'Bearer',
      accessToken: accessToken,
      accessTokenExpiresIn: CONFIG.auth.accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresIn: CONFIG.auth.refreshTokenExpiresIn,
    });
  }
}
