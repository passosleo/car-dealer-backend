import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { DeleteCategoryUseCase } from '../delete-category-use-case';
import { CategoryRepositoryMock } from '../../../../../test/categories/category-repository-mock';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { CategoryMockFactory } from '../../../../../test/categories/category-mock-factory';

describe('DeleteCategoryUseCase', () => {
  let sut: DeleteCategoryUseCase;

  beforeEach(() => {
    sut = new DeleteCategoryUseCase(CategoryRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when category does not exists', async () => {
    // Arrange
    const categoryId = faker.string.uuid();

    CategoryRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(categoryId)).rejects.toThrow(HttpException);

    // Assert
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(categoryId);
    expect(CategoryRepositoryMock.delete).not.toHaveBeenCalled();
    expect(ImageStorageMock.deleteImage).not.toHaveBeenCalled();
  });

  it('should delete a category successfully', async () => {
    // Arrange
    const categoryId = faker.string.uuid();
    const categoryExists = CategoryMockFactory.createEntity();

    CategoryRepositoryMock.findById.mockResolvedValueOnce(categoryExists);

    // Act
    const result = await sut.execute(categoryId);

    // Assert
    expect(result).toBeUndefined();
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(categoryId);
    expect(CategoryRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.delete).toHaveBeenCalledWith(categoryId);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledTimes(1);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledWith(categoryExists.imageUrl);
  });
});
