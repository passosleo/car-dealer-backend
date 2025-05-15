import { faker } from '@faker-js/faker';
import { UpdateBannerUseCase } from '../update-banner-use-case';
import { BannerRepositoryMock } from '../../../../../test/banners/banner-repository-mock';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { UpdateBannerRequestDTO } from '../../../../../infra/banners/dtos/admin/update-banner-request-dto';
import { BannerMockFactory } from '../../../../../test/banners/banner-mock-factory';
import { BannerResponseDTO } from '../../../../../infra/banners/dtos/shared/banner-response-dto';
import { Banner } from '../../../../../domain/banners/entities/banner-entity';

describe('UpdateBannerUseCase', () => {
  let sut: UpdateBannerUseCase;

  beforeEach(() => {
    sut = new UpdateBannerUseCase(BannerRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when the banner does not exist', async () => {
    // Arrange
    const bannerId = faker.string.uuid();
    BannerRepositoryMock.findById.mockResolvedValueOnce(null);

    const request = UpdateBannerRequestDTO.create({
      title: faker.lorem.sentence(),
      imageDesktop: '',
      imageMobile: '',
      startAt: new Date('2023-09-01'),
      endAt: new Date('2023-10-01'),
      active: true,
    });

    // Act & Assert
    await expect(sut.execute(bannerId, request)).rejects.toThrow(HttpException);

    expect(BannerRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update the banner without changing images if not in base64', async () => {
    // Arrange
    const bannerId = faker.string.uuid();
    const existingBanner = BannerMockFactory.createEntity();

    BannerRepositoryMock.findById.mockResolvedValueOnce(existingBanner);

    const request = UpdateBannerRequestDTO.create({
      title: faker.lorem.sentence(),
      imageDesktop: 'not-base64',
      imageMobile: 'not-base64',
      startAt: new Date('2023-09-01'),
      endAt: new Date('2023-10-01'),
      active: false,
    });

    const updatedBanner = {
      ...existingBanner,
      ...request,
    };

    BannerRepositoryMock.update.mockResolvedValueOnce(updatedBanner);

    // Act
    const result = await sut.execute(bannerId, request);

    // Assert
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(BannerRepositoryMock.update).toHaveBeenCalledWith(
      bannerId,
      expect.objectContaining<Partial<Banner>>({
        title: request.title,
        startAt: request.startAt,
        endAt: request.endAt,
        active: request.active,
      }),
    );
    expect(result).toEqual(BannerResponseDTO.create(updatedBanner));
  });

  it('should update the banner and update images if they are in base64', async () => {
    // Arrange
    const bannerId = faker.string.uuid();
    const existingBanner = BannerMockFactory.createEntity();

    BannerRepositoryMock.findById.mockResolvedValueOnce(existingBanner);

    const newDesktopBase64 = 'data:image/png;base64,newDesktopImage';
    const newMobileBase64 = 'data:image/png;base64,newMobileImage';
    const newDesktopUrl = faker.internet.url();
    const newMobileUrl = faker.internet.url();

    ImageStorageMock.updateImageBase64.mockResolvedValueOnce(newDesktopUrl);
    ImageStorageMock.updateImageBase64.mockResolvedValueOnce(newMobileUrl);

    const request = UpdateBannerRequestDTO.create({
      title: faker.lorem.sentence(),
      imageDesktop: newDesktopBase64,
      imageMobile: newMobileBase64,
      startAt: new Date('2023-09-01'),
      endAt: new Date('2023-10-01'),
      active: true,
    });

    const updatedBanner = {
      ...existingBanner,
      ...request,
      imageDesktopUrl: newDesktopUrl,
      imageMobileUrl: newMobileUrl,
    };

    BannerRepositoryMock.update.mockResolvedValueOnce(updatedBanner);

    // Act
    const result = await sut.execute(bannerId, request);

    // Assert
    expect(ImageStorageMock.updateImageBase64).toHaveBeenCalledTimes(2);
    expect(ImageStorageMock.updateImageBase64).toHaveBeenCalledWith(existingBanner.imageDesktopUrl, newDesktopBase64);
    expect(ImageStorageMock.updateImageBase64).toHaveBeenCalledWith(existingBanner.imageMobileUrl, newMobileBase64);

    expect(BannerRepositoryMock.update).toHaveBeenCalledWith(
      bannerId,
      expect.objectContaining<Partial<Banner>>({
        title: request.title,
        imageDesktopUrl: newDesktopUrl,
        imageMobileUrl: newMobileUrl,
        startAt: request.startAt,
        endAt: request.endAt,
        active: request.active,
      }),
    );

    expect(result).toEqual(BannerResponseDTO.create(updatedBanner));
  });
});
