import { Banner } from '../../../../domain/banners/entities/banner-entity';
import { IBannerRepository } from '../../../../domain/banners/repositories/banner-repository';
import { CreateBannerRequestDTO } from '../../../../infra/banners/dtos/admin/create-banner-request-dto';
import { BannerResponseDTO } from '../../../../infra/banners/dtos/shared/banner-response-dto';
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
    if (data.startAt && data.endAt && data.startAt >= data.endAt) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The start date must be before the end date');
    }

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
