import { IProfileRepository } from '../../../../domain/admin/repositories/profile-repository';
import { IRoleRepository } from '../../../../domain/admin/repositories/role-repository';
import { ProfileResponseDTO } from '../../../../infra/admin/http/dtos/profiles/profile-response-dto';
import { UpdateProfileRequestDTO } from '../../../../infra/admin/http/dtos/profiles/update-profile-request-dto';
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
