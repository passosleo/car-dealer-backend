import { IBannerRepository } from '../../../../domain/banners/repositories/banner-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class DeleteBannerUseCase {
  constructor(
    private readonly bannerRepository: IBannerRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(bannerId: string): Promise<void> {
    const bannerExists = await this.bannerRepository.findById(bannerId);
    if (!bannerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Banner not found');
    }
    await Promise.all([
      this.imageStorage.deleteImage(bannerExists.imageDesktopUrl),
      this.imageStorage.deleteImage(bannerExists.imageMobileUrl),
      this.bannerRepository.delete(bannerExists.bannerId),
    ]);
  }
}
