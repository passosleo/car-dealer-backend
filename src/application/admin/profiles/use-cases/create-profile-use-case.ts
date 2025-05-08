import { Profile } from '../../../../domain/admin/profiles/entities/profile-entity';
import { IProfileRepository } from '../../../../domain/admin/profiles/repositories/profile-repository';
import { IRoleRepository } from '../../../../domain/admin/roles/repositories/role-repository';
import { CreateProfileRequestDTO } from '../../../../infra/admin/profiles/http/dtos/create-profile-request-dto';
import { ProfileResponseDTO } from '../../../../infra/admin/profiles/http/dtos/profile-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class CreateProfileUseCase {
  constructor(
    private readonly profileRepository: IProfileRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  public async execute(data: CreateProfileRequestDTO): Promise<ProfileResponseDTO> {
    if (data.roles.length === 0) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'At least one role is required');
    }

    const profileExists = await this.profileRepository.findByName(data.name);

    if (profileExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'Profile already exists');
    }

    const roles = await this.roleRepository.findByIds(data.roles.map((role) => role.roleId));

    const allRolesAreValid = roles.length === data.roles.length;

    if (!allRolesAreValid) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'Some roles are invalid');
    }

    const profile = await this.profileRepository.create(
      Profile.create({
        name: data.name,
        roles,
      }),
    );

    return ProfileResponseDTO.create(profile);
  }
}
