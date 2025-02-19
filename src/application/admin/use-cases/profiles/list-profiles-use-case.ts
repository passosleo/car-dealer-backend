import { IProfileRepository } from '../../../../domain/admin/repositories/profile-repository';
import { ListProfilesRequestDTO } from '../../../../infra/admin/http/dtos/profiles/list-profiles-request-dto';
import { ProfileResponseDTO } from '../../../../infra/admin/http/dtos/profiles/profile-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

export class ListProfilesUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  public async execute(data: ListProfilesRequestDTO): Promise<Paginated<ProfileResponseDTO>> {
    const profiles = await this.profileRepository.list(data);
    return {
      ...profiles,
      items: profiles.items.map(ProfileResponseDTO.create),
    };
  }
}
