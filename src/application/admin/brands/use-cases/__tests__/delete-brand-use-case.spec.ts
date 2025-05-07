import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { BrandMockFactory } from '../../../../../test/admin/factories/brand-mock-factory';
import { BrandRepositoryMock } from '../../../../../test/admin/repositories/brand-repository-mock';
import { DeleteBrandUseCase } from '../delete-brand-use-case';
import { ImageStorageMock } from '../../../../../test/admin/storages/image-storage-mock';

describe('DeleteBrandUseCase', () => {
  let sut: DeleteBrandUseCase;

  beforeEach(() => {
    sut = new DeleteBrandUseCase(BrandRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when brand does not exists', async () => {
    // Arrange
    const brandId = faker.string.uuid();

    BrandRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(brandId)).rejects.toThrow(HttpException);

    // Assert
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(brandId);
    expect(BrandRepositoryMock.delete).not.toHaveBeenCalled();
    expect(ImageStorageMock.deleteImage).not.toHaveBeenCalled();
  });

  it('should delete a brand successfully', async () => {
    // Arrange
    const brandId = faker.string.uuid();
    const brandExists = BrandMockFactory.createEntity();

    BrandRepositoryMock.findById.mockResolvedValueOnce(brandExists);

    // Act
    const result = await sut.execute(brandId);

    // Assert
    expect(result).toBeUndefined();
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(brandId);
    expect(BrandRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.delete).toHaveBeenCalledWith(brandId);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledTimes(1);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledWith(brandExists.imageUrl);
  });
});
