import { IUserRepository } from '../../../../domain/admin/users/repositories/user-repository';
import { UserResponseDTO } from '../../../../infra/admin/users/http/dtos/user-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

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
