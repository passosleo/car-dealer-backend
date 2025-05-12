import { ListCategoriesRequestDTO } from '../../../../../infra/categories/dtos/admin/list-categories-request-dto';
import { CategoryMockFactory } from '../../../../../test/categories/category-mock-factory';
import { CategoryRepositoryMock } from '../../../../../test/categories/category-repository-mock';
import { ListCategoriesUseCase } from '../list-categories-use-case';

describe('ListCategoriesUseCase', () => {
  let sut: ListCategoriesUseCase;

  beforeEach(() => {
    sut = new ListCategoriesUseCase(CategoryRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated categories', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const request = ListCategoriesRequestDTO.create({
      page,
      limit,
    });
    const categoriesMock = CategoryMockFactory.createPaginatedEntities(page, limit, total);
    CategoryRepositoryMock.list.mockResolvedValueOnce(categoriesMock);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(CategoryRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
    });

    expect(result).toEqual(categoriesMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
