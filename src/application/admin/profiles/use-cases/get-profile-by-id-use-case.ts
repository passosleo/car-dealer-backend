import { IProfileRepository } from '../../../../domain/admin/profiles/repositories/profile-repository';
import { ProfileResponseDTO } from '../../../../infra/admin/profiles/http/dtos/profile-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class GetProfileByIdUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  public async execute(profileId: string): Promise<ProfileResponseDTO> {
    const profile = await this.profileRepository.findById(profileId);
    if (!profile) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Profile not found');
    }
    return ProfileResponseDTO.create(profile);
  }
}
