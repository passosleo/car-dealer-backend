import { faker } from '@faker-js/faker';
import { UpdateCategoryRequestDTO } from '../../../../../infra/admin/categories/http/dtos/update-category-request-dto';
import { UpdateCategoryUseCase } from '../update-category-use-case';
import { CategoryRepositoryMock } from '../../../../../test/admin/repositories/category-repository-mock';
import { ImageStorageMock } from '../../../../../test/admin/storages/image-storage-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { CategoryMockFactory } from '../../../../../test/admin/factories/category-mock-factory';

describe('UpdateCategoryUseCase', () => {
  let sut: UpdateCategoryUseCase;

  beforeEach(() => {
    sut = new UpdateCategoryUseCase(CategoryRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when category does not exist', async () => {
    // Arrange
    const categoryId = faker.string.uuid();
    const request = UpdateCategoryRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });

    CategoryRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(categoryId, request)).rejects.toThrow(HttpException);

    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(categoryId);
    expect(CategoryRepositoryMock.findByName).not.toHaveBeenCalled();
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(CategoryRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw a conflict exception when another category with same name exists', async () => {
    // Arrange
    const categoryId = faker.string.uuid();
    const request = UpdateCategoryRequestDTO.create({
      name: 'Existing Category',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });

    const existingCategory = CategoryMockFactory.createEntity({ categoryId });
    const conflictingCategory = CategoryMockFactory.createEntity({
      name: request.name,
      categoryId: faker.string.uuid(),
    });

    CategoryRepositoryMock.findById.mockResolvedValueOnce(existingCategory);
    CategoryRepositoryMock.findByName.mockResolvedValueOnce(conflictingCategory);

    // Act & Assert
    await expect(sut.execute(categoryId, request)).rejects.toThrow(HttpException);

    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(categoryId);
    expect(CategoryRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(CategoryRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update image if a valid base64 image is provided', async () => {
    // Arrange
    const categoryId = faker.string.uuid();
    const request = UpdateCategoryRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });

    const existingCategory = CategoryMockFactory.createEntity({
      categoryId,
      imageUrl: faker.image.url(),
    });

    const updatedImageUrl = faker.image.url();
    const updatedCategory = {
      ...existingCategory,
      name: request.name,
      active: request.active,
      imageUrl: updatedImageUrl,
    };

    CategoryRepositoryMock.findById.mockResolvedValueOnce(existingCategory);
    CategoryRepositoryMock.findByName.mockResolvedValueOnce(null);
    ImageStorageMock.updateImageBase64.mockResolvedValueOnce(updatedImageUrl);
    CategoryRepositoryMock.update.mockResolvedValueOnce(updatedCategory);

    // Act
    const result = await sut.execute(categoryId, request);

    // Assert
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(categoryId);
    expect(CategoryRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ImageStorageMock.updateImageBase64).toHaveBeenCalledWith(existingCategory.imageUrl, request.image);
    expect(CategoryRepositoryMock.update).toHaveBeenCalledWith(
      categoryId,
      expect.objectContaining({
        name: request.name,
        imageUrl: updatedImageUrl,
        active: request.active,
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        categoryId: existingCategory.categoryId,
        name: updatedCategory.name,
        imageUrl: updatedImageUrl,
        active: updatedCategory.active,
        createdAt: existingCategory.createdAt,
        updatedAt: updatedCategory.updatedAt,
      }),
    );
  });

  it('should not update image if a non-base64 image is provided', async () => {
    // Arrange
    const categoryId = faker.string.uuid();
    const currentImageUrl = faker.image.url();

    const request = UpdateCategoryRequestDTO.create({
      name: faker.vehicle.manufacturer(),
      image: currentImageUrl,
      active: true,
    });

    const existingCategory = CategoryMockFactory.createEntity({
      categoryId,
      imageUrl: currentImageUrl,
    });

    const updatedCategory = {
      ...existingCategory,
      name: request.name,
      active: request.active,
    };

    CategoryRepositoryMock.findById.mockResolvedValueOnce(existingCategory);
    CategoryRepositoryMock.findByName.mockResolvedValueOnce(null);
    CategoryRepositoryMock.update.mockResolvedValueOnce(updatedCategory);

    // Act
    const result = await sut.execute(categoryId, request);

    // Assert
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(CategoryRepositoryMock.update).toHaveBeenCalledWith(
      categoryId,
      expect.objectContaining({
        name: request.name,
        imageUrl: currentImageUrl,
        active: request.active,
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        categoryId: existingCategory.categoryId,
        name: updatedCategory.name,
        imageUrl: currentImageUrl,
        active: updatedCategory.active,
      }),
    );
  });
});
