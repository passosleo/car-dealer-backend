import { IProfileRepository } from '../../../../domain/admin/repositories/profile-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class DeleteProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  public async execute(profileId: string): Promise<void> {
    const profile = await this.profileRepository.findById(profileId);
    if (!profile) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Profile not found');
    }
    await this.profileRepository.delete(profileId);
  }
}
