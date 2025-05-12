import { IUserRepository } from '../../../../domain/users/repositories/user-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { UserResponseDTO } from '../../../../infra/users/dtos/admin/user-response-dto';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(sellerId: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(sellerId);
    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }
    return UserResponseDTO.create(user);
  }
}
