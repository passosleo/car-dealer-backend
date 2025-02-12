import { SessionResponseDTO } from '../../../../infra/admin/http/dtos/auth/session-response-dto';
import { CreateSessionRequestDTO } from '../../../../infra/admin/http/dtos/auth/create-session-request-dto';
import { IHashService } from '../../../shared/services/hash-service';
import { ITokenService } from '../../../shared/services/token-service';
import { IUserRepository } from '../../../../domain/admin/repositories/user-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { envConfig } from '../../../../infra/shared/http/config/env-config';

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
    const token = this.tokenService.generateToken({ userId: usersExists.userId });
    const refreshToken = this.tokenService.generateRefreshToken({ userId: usersExists.userId });
    return SessionResponseDTO.create({
      type: 'Bearer',
      token,
      refreshToken,
      expiresIn: envConfig.auth.expiresIn,
    });
  }
}
