import { IProfileRepository } from '../../../../domain/admin/repositories/profile-repository';
import { GetProfileByIdResponseDTO } from '../../../../infra/admin/http/dtos/profiles/get-profile-by-id-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class GetProfileByIdUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  public async execute(profileId: string): Promise<GetProfileByIdResponseDTO> {
    const profile = await this.profileRepository.findById(profileId);
    if (!profile) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Profile not found');
    }
    return GetProfileByIdResponseDTO.create(profile);
  }
}
