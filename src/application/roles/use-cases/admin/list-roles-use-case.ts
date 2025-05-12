import { IRoleRepository } from '../../../../domain/roles/repositories/role-repository';
import { ListRolesResponseDTO } from '../../../../infra/roles/dtos/admin/list-roles-response-dto';

export class ListRolesUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  public async execute(): Promise<ListRolesResponseDTO[]> {
    const roles = await this.roleRepository.list();
    return roles.map(ListRolesResponseDTO.create);
  }
}
