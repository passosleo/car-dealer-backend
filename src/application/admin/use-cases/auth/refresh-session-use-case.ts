import { SessionResponseDTO } from '../../../../infra/admin/http/dtos/auth/session-response-dto';
import { ITokenService } from '../../../shared/services/token-service';
import { RefreshSessionRequestDTO } from '../../../../infra/admin/http/dtos/auth/refresh-session-request-dto';
import { IUserRepository } from '../../../../domain/admin/repositories/user-repository';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { envConfig } from '../../../../infra/shared/http/config/env-config';

export class RefreshSessionUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
  ) {}

  public async execute(data: RefreshSessionRequestDTO): Promise<SessionResponseDTO> {
    const refreshTokenPayload = this.tokenService.verifyRefreshToken<{ userId: string }>(data.refreshToken);
    const userExists = await this.userRepository.findById(refreshTokenPayload.userId);
    if (!userExists) throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    const token = this.tokenService.generateToken({ userId: userExists.userId });
    const refreshToken = this.tokenService.generateRefreshToken({ userId: userExists.userId });
    return SessionResponseDTO.create({
      type: 'Bearer',
      token,
      refreshToken,
      expiresIn: envConfig.auth.expiresIn,
    });
  }
}
