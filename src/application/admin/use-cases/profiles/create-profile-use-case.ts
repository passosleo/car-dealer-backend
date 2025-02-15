import { Profile } from '../../../../domain/admin/entities/profile-entity';
import { IProfileRepository } from '../../../../domain/admin/repositories/profile-repository';
import { IRoleRepository } from '../../../../domain/admin/repositories/role-repository';
import { CreateProfileRequestDTO } from '../../../../infra/admin/http/dtos/profiles/create-profile-request-dto';
import { CreateProfileResponseDTO } from '../../../../infra/admin/http/dtos/profiles/create-profile-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class CreateProfileUseCase {
  constructor(
    private readonly profileRepository: IProfileRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  public async execute(data: CreateProfileRequestDTO): Promise<CreateProfileResponseDTO> {
    const roles = await this.roleRepository.findByIds(data.roles.map((role) => role.roleId));
    const areAllRolesValid = roles.length === data.roles.length;
    if (!areAllRolesValid) throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'Some roles are invalid');
    const profile = await this.profileRepository.create(
      Profile.create({
        name: data.name,
        roles,
      }),
    );
    return CreateProfileResponseDTO.create(profile);
  }
}
