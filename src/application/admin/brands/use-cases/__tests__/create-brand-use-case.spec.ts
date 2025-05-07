import { faker } from '@faker-js/faker';
import { CreateBrandRequestDTO } from '../../../../../infra/admin/brands/http/dtos/create-brand-request-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { BrandMockFactory } from '../../../../../test/admin/factories/brand-mock-factory';
import { BrandRepositoryMock } from '../../../../../test/admin/repositories/brand-repository-mock';
import { ImageStorageMock } from '../../../../../test/admin/storages/image-storage-mock';
import { CreateBrandUseCase } from '../create-brand-use-case';

describe('CreateBrandUseCase', () => {
  let sut: CreateBrandUseCase;

  beforeEach(() => {
    sut = new CreateBrandUseCase(BrandRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a unprocessable entity exception when image is not base64', async () => {
    // Arrange
    const requestWithInvalidImage = CreateBrandRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'invalid-image',
      active: true,
    });

    // Act & Assert
    await expect(sut.execute(requestWithInvalidImage)).rejects.toThrow(HttpException);

    // Assert
    expect(BrandRepositoryMock.findByName).not.toHaveBeenCalled();
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(BrandRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a conflict exception when another brand with same name exists', async () => {
    // Arrange
    const request = CreateBrandRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });
    const brandExists = BrandMockFactory.createEntity({
      name: request.name,
    });

    BrandRepositoryMock.findByName.mockResolvedValueOnce(brandExists);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(BrandRepositoryMock.findByName).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(BrandRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a new brand successfully', async () => {
    // Arrange
    const request = CreateBrandRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });
    const createdBrand = BrandMockFactory.createEntity({
      name: request.name,
      imageUrl: faker.image.url(),
      active: request.active,
    });

    BrandRepositoryMock.findByName.mockResolvedValueOnce(null);
    ImageStorageMock.uploadImageBase64.mockResolvedValueOnce(createdBrand.imageUrl);
    BrandRepositoryMock.create.mockResolvedValueOnce(createdBrand);

    // Act
    const result = await sut.execute(request);

    // Assert

    expect(BrandRepositoryMock.findByName).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledTimes(1);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledWith(request.image);
    expect(BrandRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: request.name,
        imageUrl: expect.any(String),
        active: request.active,
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        brandId: createdBrand.brandId,
        name: createdBrand.name,
        imageUrl: createdBrand.imageUrl,
        active: createdBrand.active,
        createdAt: createdBrand.createdAt,
        updatedAt: createdBrand.updatedAt,
      }),
    );
  });
});
