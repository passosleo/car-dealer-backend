import { IProfileRepository } from '../../../../domain/admin/profiles/repositories/profile-repository';
import { IRoleRepository } from '../../../../domain/admin/roles/repositories/role-repository';
import { ProfileResponseDTO } from '../../../../infra/admin/profiles/http/dtos/profile-response-dto';
import { UpdateProfileRequestDTO } from '../../../../infra/admin/profiles/http/dtos/update-profile-request-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class UpdateProfileUseCase {
  constructor(
    private readonly profileRepository: IProfileRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  public async execute(profileId: string, data: UpdateProfileRequestDTO): Promise<ProfileResponseDTO> {
    if (data.roles.length === 0) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'At least one role is required');
    }

    const profileExists = await this.profileRepository.findByName(data.name);

    if (profileExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'Profile already exists');
    }

    const profile = await this.profileRepository.findById(profileId);

    if (!profile) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Profile not found');
    }

    const roles = await this.roleRepository.findByIds(data.roles.map((role) => role.roleId));

    const allRolesAreValid = roles.length === data.roles.length;

    if (!allRolesAreValid) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'Some roles are invalid');
    }

    const updatedProfile = await this.profileRepository.update(profileId, {
      name: data.name,
      roles,
    });

    return ProfileResponseDTO.create(updatedProfile);
  }
}
