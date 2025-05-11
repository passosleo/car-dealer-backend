import { faker } from '@faker-js/faker';
import { CreateCategoryUseCase } from '../create-category-use-case';
import { CategoryRepositoryMock } from '../../../../../test/categories/category-repository-mock';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { CreateCategoryRequestDTO } from '../../../../../infra/categories/dtos/admin/create-category-request-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { CategoryMockFactory } from '../../../../../test/categories/category-mock-factory';

describe('CreateCategoryUseCase', () => {
  let sut: CreateCategoryUseCase;

  beforeEach(() => {
    sut = new CreateCategoryUseCase(CategoryRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a unprocessable entity exception when image is not base64', async () => {
    // Arrange
    const requestWithInvalidImage = CreateCategoryRequestDTO.create({
      name: faker.vehicle.type(),
      image: 'invalid-image',
      active: true,
    });

    // Act & Assert
    await expect(sut.execute(requestWithInvalidImage)).rejects.toThrow(HttpException);

    // Assert
    expect(CategoryRepositoryMock.findByName).not.toHaveBeenCalled();
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(CategoryRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a conflict exception when another category with same name exists', async () => {
    // Arrange
    const request = CreateCategoryRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });
    const categoryExists = CategoryMockFactory.createEntity({
      name: request.name,
    });

    CategoryRepositoryMock.findByName.mockResolvedValueOnce(categoryExists);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(CategoryRepositoryMock.findByName).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(CategoryRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a new category successfully', async () => {
    // Arrange
    const request = CreateCategoryRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });
    const createdCategory = CategoryMockFactory.createEntity({
      name: request.name,
      imageUrl: faker.image.url(),
      active: request.active,
    });

    CategoryRepositoryMock.findByName.mockResolvedValueOnce(null);
    ImageStorageMock.uploadImageBase64.mockResolvedValueOnce(createdCategory.imageUrl);
    CategoryRepositoryMock.create.mockResolvedValueOnce(createdCategory);

    // Act
    const result = await sut.execute(request);

    // Assert

    expect(CategoryRepositoryMock.findByName).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledTimes(1);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledWith(request.image);
    expect(CategoryRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: request.name,
        imageUrl: expect.any(String),
        active: request.active,
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        categoryId: createdCategory.categoryId,
        name: createdCategory.name,
        imageUrl: createdCategory.imageUrl,
        active: createdCategory.active,
        createdAt: createdCategory.createdAt,
        updatedAt: createdCategory.updatedAt,
      }),
    );
  });
});
