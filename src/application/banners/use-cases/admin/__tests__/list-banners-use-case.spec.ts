import { BannerMockFactory } from '../../../../../test/banners/banner-mock-factory';
import { BannerRepositoryMock } from '../../../../../test/banners/banner-repository-mock';
import { ListBannersUseCase } from '../list-banners-use-case';

describe('ListBannersUseCase', () => {
  let sut: ListBannersUseCase;

  beforeEach(() => {
    sut = new ListBannersUseCase(BannerRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated banners', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const bannersMock = BannerMockFactory.createPaginatedEntities(page, limit, total);
    BannerRepositoryMock.list.mockResolvedValueOnce(bannersMock);

    // Act
    const result = await sut.execute({
      page,
      limit,
    });

    // Assert
    expect(BannerRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(BannerRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
    });

    expect(result).toEqual(bannersMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
