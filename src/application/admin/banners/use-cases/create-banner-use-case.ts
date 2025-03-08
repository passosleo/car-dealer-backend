import { Banner } from '../../../../domain/admin/banners/entities/banner-entity';
import { IBannerRepository } from '../../../../domain/admin/banners/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/banners/http/dtos/banner-response-dto';
import { CreateBannerRequestDTO } from '../../../../infra/admin/banners/http/dtos/create-banner-request-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class CreateBannerUseCase {
  constructor(
    private readonly bannerRepository: IBannerRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute({ imageDesktop, imageMobile, ...data }: CreateBannerRequestDTO): Promise<BannerResponseDTO> {
    const isAllImagesValid = StringHelper.isBase64Image(imageDesktop) && StringHelper.isBase64Image(imageMobile);

    if (!isAllImagesValid) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The images must be in base64 format');
    }

    const [imageDesktopUrl, imageMobileUrl] = await Promise.all([
      this.imageStorage.uploadImageBase64(imageDesktop),
      this.imageStorage.uploadImageBase64(imageMobile),
    ]);

    const banner = await this.bannerRepository.create(
      Banner.create({
        ...data,
        imageDesktopUrl,
        imageMobileUrl,
      }),
    );

    return BannerResponseDTO.create(banner);
  }
}
