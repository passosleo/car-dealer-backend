import { BrandMockFactory } from '../../../../../test/admin/factories/brand-mock-factory';
import { BrandRepositoryMock } from '../../../../../test/admin/repositories/brand-repository-mock';
import { ListBrandsUseCase } from '../list-brands-use-case';

describe('ListBrandsUseCase', () => {
  let sut: ListBrandsUseCase;

  beforeEach(() => {
    sut = new ListBrandsUseCase(BrandRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated brands', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const brandsMock = BrandMockFactory.createPaginatedEntities(page, limit, total);
    BrandRepositoryMock.list.mockResolvedValueOnce(brandsMock);

    // Act
    const result = await sut.execute({
      page,
      limit,
    });

    // Assert
    expect(BrandRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
    });

    expect(result).toEqual(brandsMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
