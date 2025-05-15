import { ListActiveBrandsRequestDTO } from '../../../../../infra/brands/dtos/public/list-active-brands-request-dto';
import { BrandMockFactory } from '../../../../../test/brands/brand-mock-factory';
import { BrandRepositoryMock } from '../../../../../test/brands/brand-repository-mock';
import { ListActiveBrandsUseCase } from '../list-active-brands-use-case';

describe('ListActiveBrandsUseCase', () => {
  let sut: ListActiveBrandsUseCase;

  beforeEach(() => {
    sut = new ListActiveBrandsUseCase(BrandRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated brands', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const brandsMock = BrandMockFactory.createPaginatedEntities(page, limit, total);
    BrandRepositoryMock.list.mockResolvedValueOnce(brandsMock);

    const request = ListActiveBrandsRequestDTO.create({
      page,
      limit,
    });

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(BrandRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
      status: 'active',
    });

    expect(result).toEqual(brandsMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
