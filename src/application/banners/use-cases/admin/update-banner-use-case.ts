import { Banner } from '../../../../domain/banners/entities/banner-entity';
import { IBannerRepository } from '../../../../domain/banners/repositories/banner-repository';
import { UpdateBannerRequestDTO } from '../../../../infra/banners/dtos/admin/update-banner-request-dto';
import { BannerResponseDTO } from '../../../../infra/banners/dtos/shared/banner-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';

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
    { imageDesktop, imageMobile, ...data }: UpdateBannerRequestDTO,
  ): Promise<BannerResponseDTO> {
    const bannerExists = await this.bannerRepository.findById(bannerId);

    if (!bannerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Banner not found');
    }

    const [imageDesktopUrl, imageMobileUrl] = await Promise.all([
      this.getImageUpdatePromise(imageDesktop, bannerExists.imageDesktopUrl),
      this.getImageUpdatePromise(imageMobile, bannerExists.imageMobileUrl),
    ]);

    const updateBannerData: Partial<Banner> = {
      ...data,
      ...(imageDesktopUrl ? { imageDesktopUrl } : {}),
      ...(imageMobileUrl ? { imageMobileUrl } : {}),
    };

    const banner = await this.bannerRepository.update(bannerId, updateBannerData);

    return BannerResponseDTO.create(banner);
  }

  private async getImageUpdatePromise(newImage: string, currentImage: string) {
    if (StringHelper.isBase64Image(newImage)) {
      return this.imageStorage.updateImageBase64(currentImage, newImage);
    }
    return Promise.resolve(null);
  }
}
