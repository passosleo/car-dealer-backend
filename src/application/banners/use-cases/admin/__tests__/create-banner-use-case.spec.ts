import { faker } from '@faker-js/faker';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { CreateBannerUseCase } from '../create-banner-use-case';
import { BannerRepositoryMock } from '../../../../../test/banners/banner-repository-mock';
import { CreateBannerRequestDTO } from '../../../../../infra/banners/dtos/admin/create-banner-request-dto';
import { BannerMockFactory } from '../../../../../test/banners/banner-mock-factory';
import { BannerResponseDTO } from '../../../../../infra/banners/dtos/shared/banner-response-dto';
import { Banner } from '../../../../../domain/banners/entities/banner-entity';

describe('CreateBannerUseCase', () => {
  let sut: CreateBannerUseCase;

  beforeEach(() => {
    sut = new CreateBannerUseCase(BannerRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a unprocessable entity exception when the start date is after the end date', async () => {
    // Arrange
    const request = CreateBannerRequestDTO.create({
      title: faker.lorem.sentence(),
      imageDesktop: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      imageMobile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      startAt: new Date('2023-10-01'),
      endAt: new Date('2023-09-01'),
      active: true,
    });

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(BannerRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a unprocessable entity exception when the images are not in base64 format', async () => {
    // Arrange
    const request = CreateBannerRequestDTO.create({
      title: faker.lorem.sentence(),
      imageDesktop: 'invalid-image',
      imageMobile: 'invalid-image',
      startAt: new Date('2023-09-01'),
      endAt: new Date('2023-10-01'),
      active: true,
    });

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(BannerRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a new banner successfully', async () => {
    // Arrange
    const request = CreateBannerRequestDTO.create({
      title: faker.lorem.sentence(),
      imageDesktop: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      imageMobile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      startAt: new Date('2023-09-01'),
      endAt: new Date('2023-10-01'),
      active: true,
    });

    const imageDesktopUrl = faker.internet.url();
    const imageMobileUrl = faker.internet.url();

    ImageStorageMock.uploadImageBase64.mockResolvedValueOnce(imageDesktopUrl);
    ImageStorageMock.uploadImageBase64.mockResolvedValueOnce(imageMobileUrl);

    const createdBanner = BannerMockFactory.createEntity({
      title: request.title,
      imageDesktopUrl,
      imageMobileUrl,
      startAt: request.startAt,
      endAt: request.endAt,
      active: request.active,
    });
    BannerRepositoryMock.create.mockResolvedValueOnce(createdBanner);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(result).toEqual(
      expect.objectContaining<BannerResponseDTO>({
        bannerId: createdBanner.bannerId,
        title: createdBanner.title,
        imageDesktopUrl: createdBanner.imageDesktopUrl,
        imageMobileUrl: createdBanner.imageMobileUrl,
        startAt: createdBanner.startAt,
        endAt: createdBanner.endAt,
        active: createdBanner.active,
        createdAt: createdBanner.createdAt,
        updatedAt: createdBanner.updatedAt,
      }),
    );
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledTimes(2);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledWith(request.imageDesktop);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledWith(request.imageMobile);
    expect(BannerRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(BannerRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining<Partial<Banner>>({
        title: request.title,
        imageDesktopUrl,
        imageMobileUrl,
        startAt: request.startAt,
        endAt: request.endAt,
        active: request.active,
      }),
    );
  });
});
