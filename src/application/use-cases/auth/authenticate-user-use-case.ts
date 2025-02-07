import { IUserRepository } from '../../../domain/repositories/user-repository';
import { AuthenticateUserResponseDTO } from '../../../infra/http/dtos/auth/authenticate-user-response-dto.ts';
import { AuthenticateUserRequestDTO } from '../../../infra/http/dtos/auth/authenticate-user-request-dto';
import { HttpException } from '../../../infra/http/response/http-exception';
import { HttpStatus } from '../../../infra/http/response/http-status';
import { IHashService } from '../../services/hash-service';
import { ITokenService } from '../../services/token-service';

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  public async execute(data: AuthenticateUserRequestDTO): Promise<AuthenticateUserResponseDTO> {
    throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    const usersExists = await this.userRepository.findByEmail(data.email);
    if (!usersExists) throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    const passwordMatch = await this.hashService.compare(data.password, usersExists.password);
    if (!passwordMatch) throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid password');
    const token = this.tokenService.generateToken(usersExists.userId);
    const refreshToken = this.tokenService.generateRefreshToken(usersExists.userId);
    return AuthenticateUserResponseDTO.create({
      type: 'Bearer',
      token,
      refreshToken,
      expiresIn: 3600,
    });
  }
}
