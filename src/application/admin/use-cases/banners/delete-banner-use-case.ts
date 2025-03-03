import { IBannerRepository } from '../../../../domain/admin/repositories/banner-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class DeleteBannerUseCase {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  public async execute(bannerId: string): Promise<void> {
    const bannerExists = await this.bannerRepository.findById(bannerId);
    if (!bannerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Banner not found');
    }
    await this.bannerRepository.delete(bannerId);
  }
}
