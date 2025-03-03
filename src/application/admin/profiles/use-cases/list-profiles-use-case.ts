import { IProfileRepository } from '../../../../domain/admin/profiles/repositories/profile-repository';
import { ListProfilesRequestDTO } from '../../../../infra/admin/profiles/http/dtos/list-profiles-request-dto';
import { ProfileResponseDTO } from '../../../../infra/admin/profiles/http/dtos/profile-response-dto';
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
