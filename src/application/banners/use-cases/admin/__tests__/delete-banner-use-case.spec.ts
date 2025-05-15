import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { DeleteBannerUseCase } from '../delete-banner-use-case';
import { BannerRepositoryMock } from '../../../../../test/banners/banner-repository-mock';
import { BannerMockFactory } from '../../../../../test/banners/banner-mock-factory';

describe('DeleteBannerUseCase', () => {
  let sut: DeleteBannerUseCase;

  beforeEach(() => {
    sut = new DeleteBannerUseCase(BannerRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when banner does not exists', async () => {
    // Arrange
    const bannerId = faker.string.uuid();

    BannerRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(bannerId)).rejects.toThrow(HttpException);

    // Assert
    expect(BannerRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BannerRepositoryMock.findById).toHaveBeenCalledWith(bannerId);
    expect(BannerRepositoryMock.delete).not.toHaveBeenCalled();
    expect(ImageStorageMock.deleteImage).not.toHaveBeenCalled();
  });

  it('should delete a banner successfully', async () => {
    // Arrange
    const bannerId = faker.string.uuid();
    const bannerExists = BannerMockFactory.createEntity();

    BannerRepositoryMock.findById.mockResolvedValueOnce(bannerExists);

    // Act
    const result = await sut.execute(bannerId);

    // Assert
    expect(result).toBeUndefined();
    expect(BannerRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BannerRepositoryMock.findById).toHaveBeenCalledWith(bannerId);
    expect(BannerRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(BannerRepositoryMock.delete).toHaveBeenCalledWith(bannerExists.bannerId);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledTimes(2);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledWith(bannerExists.imageDesktopUrl);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledWith(bannerExists.imageMobileUrl);
  });
});
