import { SessionResponseDTO } from '../../../../infra/admin/auth/http/dtos/session-response-dto';
import { CreateSessionRequestDTO } from '../../../../infra/admin/auth/http/dtos/create-session-request-dto';
import { IHashService } from '../../../shared/services/hash-service';
import { ITokenService } from '../../../shared/services/token-service';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { CONFIG } from '../../../../infra/shared/constants/config';
import { IUserRepository } from '../../../../domain/admin/users/repositories/user-repository';

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
    const token = this.tokenService.generateToken({ id: usersExists.userId });
    const refreshToken = this.tokenService.generateRefreshToken({ id: usersExists.userId });
    return SessionResponseDTO.create({
      type: 'Bearer',
      token,
      refreshToken,
      expiresIn: CONFIG.auth.expiresIn,
    });
  }
}
