import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { CategoryRepositoryMock } from '../../../../../test/admin/repositories/category-repository-mock';
import { GetCategoryByIdUseCase } from '../get-category-by-id-use-case';
import { CategoryMockFactory } from '../../../../../test/admin/factories/category-mock-factory';

describe('GetCategoryByIdUseCase', () => {
  let sut: GetCategoryByIdUseCase;

  beforeEach(() => {
    sut = new GetCategoryByIdUseCase(CategoryRepositoryMock);
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
  });

  it('should return a category by id successfully', async () => {
    // Arrange
    const categoryId = faker.string.uuid();
    const categoryExists = CategoryMockFactory.createEntity();

    CategoryRepositoryMock.findById.mockResolvedValueOnce(categoryExists);

    // Act
    const result = await sut.execute(categoryId);

    // Assert
    expect(result).toEqual(categoryExists);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(categoryId);
  });
});
