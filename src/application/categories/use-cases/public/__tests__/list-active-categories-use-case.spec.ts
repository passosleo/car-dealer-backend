import { ListActiveCategoriesRequestDTO } from '../../../../../infra/categories/dtos/public/list-active-categories-request-dto';
import { CategoryMockFactory } from '../../../../../test/categories/category-mock-factory';
import { CategoryRepositoryMock } from '../../../../../test/categories/category-repository-mock';
import { ListActiveCategoriesUseCase } from '../list-active-categories-use-case';

describe('ListActiveCategories', () => {
  let sut: ListActiveCategoriesUseCase;

  beforeEach(() => {
    sut = new ListActiveCategoriesUseCase(CategoryRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated categories', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const categoriesMock = CategoryMockFactory.createPaginatedEntities(page, limit, total);
    CategoryRepositoryMock.list.mockResolvedValueOnce(categoriesMock);

    const request = ListActiveCategoriesRequestDTO.create({
      page,
      limit,
    });

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(CategoryRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
      status: 'active',
    });

    expect(result).toEqual(categoriesMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
