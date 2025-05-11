import { IUserRepository } from '../../../../domain/users/repositories/user-repository';
import { Paginated } from '../../../../infra/shared/types/generic';
import { ListUsersRequestDTO } from '../../../../infra/users/dtos/admin/list-users-request-dto';
import { UserResponseDTO } from '../../../../infra/users/dtos/admin/user-response-dto';

export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: ListUsersRequestDTO): Promise<Paginated<UserResponseDTO>> {
    const users = await this.userRepository.list(data);
    return {
      ...users,
      items: users.items.map(UserResponseDTO.create),
    };
  }
}
