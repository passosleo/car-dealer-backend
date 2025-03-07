import { Banner } from '../../../../domain/admin/banners/entities/banner-entity';
import { IBannerRepository } from '../../../../domain/admin/banners/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/banners/http/dtos/banner-response-dto';
import { CreateBannerRequestDTO } from '../../../../infra/admin/banners/http/dtos/create-banner-request-dto';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class CreateBannerUseCase {
  constructor(
    private readonly bannerRepository: IBannerRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute({
    imageDesktopBase64,
    imageMobileBase64,
    ...data
  }: CreateBannerRequestDTO): Promise<BannerResponseDTO> {
    const [imageDesktopUrl, imageMobileUrl] = await Promise.all([
      this.imageStorage.uploadImageBase64(imageDesktopBase64),
      this.imageStorage.uploadImageBase64(imageMobileBase64),
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
