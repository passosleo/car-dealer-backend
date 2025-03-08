import { IUserRepository } from '../../../../domain/admin/users/repositories/user-repository';
import { ListUsersRequestDTO } from '../../../../infra/admin/users/http/dtos/list-users-request-dto';
import { UserResponseDTO } from '../../../../infra/admin/users/http/dtos/user-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

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
