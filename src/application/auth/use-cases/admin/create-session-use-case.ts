import { IHashService } from '../../../shared/services/hash-service';
import { ITokenService } from '../../../shared/services/token-service';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { CONFIG } from '../../../../infra/shared/constants/config';
import { IUserRepository } from '../../../../domain/users/repositories/user-repository';
import { CreateSessionRequestDTO } from '../../../../infra/auth/admin/dtos/admin/create-session-request-dto';
import { SessionResponseDTO } from '../../../../infra/auth/admin/dtos/admin/session-response-dto';

export class CreateSessionUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  public async execute(data: CreateSessionRequestDTO): Promise<SessionResponseDTO> {
    const usersExists = await this.userRepository.findByEmail(data.email);
    if (!usersExists) throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    const passwordMatch = await this.hashService.compare(data.password, usersExists.password);
    if (!passwordMatch) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid password');
    const accessToken = this.tokenService.generateAccessToken({ id: usersExists.userId });
    const refreshToken = this.tokenService.generateRefreshToken({ id: usersExists.userId });
    return SessionResponseDTO.create({
      type: 'Bearer',
      accessToken,
      accessTokenExpiresIn: CONFIG.auth.accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresIn: CONFIG.auth.refreshTokenExpiresIn,
    });
  }
}
