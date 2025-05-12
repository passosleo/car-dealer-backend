import { IUserRepository } from '../../../../domain/users/repositories/user-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(sellerId: string): Promise<void> {
    const userExists = await this.userRepository.findById(sellerId);
    if (!userExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }
    await this.userRepository.delete(sellerId);
  }
}
