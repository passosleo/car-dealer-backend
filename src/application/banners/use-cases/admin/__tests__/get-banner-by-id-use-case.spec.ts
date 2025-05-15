import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { GetBannerByIdUseCase } from '../get-banner-by-id-use-case';
import { BannerRepositoryMock } from '../../../../../test/banners/banner-repository-mock';
import { BannerMockFactory } from '../../../../../test/banners/banner-mock-factory';

describe('GetBannerByIdUseCase', () => {
  let sut: GetBannerByIdUseCase;

  beforeEach(() => {
    sut = new GetBannerByIdUseCase(BannerRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when banner does not exists', async () => {
    // Arrange
    const brandId = faker.string.uuid();

    BannerRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(brandId)).rejects.toThrow(HttpException);

    // Assert
    expect(BannerRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BannerRepositoryMock.findById).toHaveBeenCalledWith(brandId);
  });

  it('should return a banner by id successfully', async () => {
    // Arrange
    const brandId = faker.string.uuid();
    const brandExists = BannerMockFactory.createEntity();

    BannerRepositoryMock.findById.mockResolvedValueOnce(brandExists);

    // Act
    const result = await sut.execute(brandId);

    // Assert
    expect(result).toEqual(brandExists);
    expect(BannerRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BannerRepositoryMock.findById).toHaveBeenCalledWith(brandId);
  });
});
