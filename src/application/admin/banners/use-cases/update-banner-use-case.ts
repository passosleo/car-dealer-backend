import { IBannerRepository } from '../../../../domain/admin/banners/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/banners/http/dtos/banner-response-dto';
import { UpdateBannerRequestDTO } from '../../../../infra/admin/banners/http/dtos/update-banner-request-dto';

import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class UpdateBannerUseCase {
  constructor(
    private readonly bannerRepository: IBannerRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(
    bannerId: string,
    { imageDesktopBase64, imageMobileBase64, ...data }: UpdateBannerRequestDTO,
  ): Promise<BannerResponseDTO> {
    const bannerExists = await this.bannerRepository.findById(bannerId);
    if (!bannerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Banner not found');
    }
    const [imageDesktopUrl, imageMobileUrl] = await Promise.all([
      this.imageStorage.updateImageBase64(bannerExists.imageDesktopUrl, imageDesktopBase64),
      this.imageStorage.updateImageBase64(bannerExists.imageMobileUrl, imageMobileBase64),
    ]);
    const banner = await this.bannerRepository.update(bannerId, {
      ...data,
      imageDesktopUrl,
      imageMobileUrl,
    });
    return BannerResponseDTO.create(banner);
  }
}
