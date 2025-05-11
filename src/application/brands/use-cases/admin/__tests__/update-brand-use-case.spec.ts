import { faker } from '@faker-js/faker';
import { UpdateBrandUseCase } from '../update-brand-use-case';
import { UpdateBrandRequestDTO } from '../../../../../infra/brands/dtos/admin/update-brand-request-dto';
import { BrandRepositoryMock } from '../../../../../test/brands/brand-repository-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { BrandMockFactory } from '../../../../../test/brands/brand-mock-factory';

describe('UpdateBrandUseCase', () => {
  let sut: UpdateBrandUseCase;

  beforeEach(() => {
    sut = new UpdateBrandUseCase(BrandRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when brand does not exist', async () => {
    // Arrange
    const brandId = faker.string.uuid();
    const request = UpdateBrandRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });

    BrandRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(brandId, request)).rejects.toThrow(HttpException);

    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(brandId);
    expect(BrandRepositoryMock.findByName).not.toHaveBeenCalled();
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(BrandRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw a conflict exception when another brand with same name exists', async () => {
    // Arrange
    const brandId = faker.string.uuid();
    const request = UpdateBrandRequestDTO.create({
      name: 'Existing Brand',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });

    const existingBrand = BrandMockFactory.createEntity({ brandId });
    const conflictingBrand = BrandMockFactory.createEntity({
      name: request.name,
      brandId: faker.string.uuid(), // diferente do brandId atual
    });

    BrandRepositoryMock.findById.mockResolvedValueOnce(existingBrand);
    BrandRepositoryMock.findByName.mockResolvedValueOnce(conflictingBrand);

    // Act & Assert
    await expect(sut.execute(brandId, request)).rejects.toThrow(HttpException);

    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(brandId);
    expect(BrandRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(BrandRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update image if a valid base64 image is provided', async () => {
    // Arrange
    const brandId = faker.string.uuid();
    const request = UpdateBrandRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });

    const existingBrand = BrandMockFactory.createEntity({
      brandId,
      imageUrl: faker.image.url(),
    });

    const updatedImageUrl = faker.image.url();
    const updatedBrand = {
      ...existingBrand,
      name: request.name,
      active: request.active,
      imageUrl: updatedImageUrl,
    };

    BrandRepositoryMock.findById.mockResolvedValueOnce(existingBrand);
    BrandRepositoryMock.findByName.mockResolvedValueOnce(null);
    ImageStorageMock.updateImageBase64.mockResolvedValueOnce(updatedImageUrl);
    BrandRepositoryMock.update.mockResolvedValueOnce(updatedBrand);

    // Act
    const result = await sut.execute(brandId, request);

    // Assert
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(brandId);
    expect(BrandRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.updateImageBase64).toHaveBeenCalledWith(existingBrand.imageUrl, request.image);
    expect(BrandRepositoryMock.update).toHaveBeenCalledWith(
      brandId,
      expect.objectContaining({
        name: request.name,
        imageUrl: updatedImageUrl,
        active: request.active,
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        brandId: existingBrand.brandId,
        name: updatedBrand.name,
        imageUrl: updatedImageUrl,
        active: updatedBrand.active,
        createdAt: existingBrand.createdAt,
        updatedAt: updatedBrand.updatedAt,
      }),
    );
  });

  it('should not update image if a non-base64 image is provided', async () => {
    // Arrange
    const brandId = faker.string.uuid();
    const currentImageUrl = faker.image.url();

    const request = UpdateBrandRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: currentImageUrl,
      active: true,
    });

    const existingBrand = BrandMockFactory.createEntity({
      brandId,
      imageUrl: currentImageUrl,
    });

    const updatedBrand = {
      ...existingBrand,
      name: request.name,
      active: request.active,
    };

    BrandRepositoryMock.findById.mockResolvedValueOnce(existingBrand);
    BrandRepositoryMock.findByName.mockResolvedValueOnce(null);
    BrandRepositoryMock.update.mockResolvedValueOnce(updatedBrand);

    // Act
    const result = await sut.execute(brandId, request);

    // Assert
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(BrandRepositoryMock.update).toHaveBeenCalledWith(
      brandId,
      expect.objectContaining({
        name: request.name,
        imageUrl: currentImageUrl,
        active: request.active,
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        brandId: existingBrand.brandId,
        name: updatedBrand.name,
        imageUrl: currentImageUrl,
        active: updatedBrand.active,
      }),
    );
  });
});
