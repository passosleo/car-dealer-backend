import { ListSellersRequestDTO } from '../../../../../infra/sellers/dtos/admin/list-sellers-request-dto';

import { SellerMockFactory } from '../../../../../test/sellers/seller-mock-factory';
import { SellerRepositoryMock } from '../../../../../test/sellers/seller-repository-mock';
import { ListSellersUseCase } from '../list-sellers-use-case';

describe('ListSellersUseCase', () => {
  let sut: ListSellersUseCase;

  beforeEach(() => {
    sut = new ListSellersUseCase(SellerRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated sellers', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const brandsMock = SellerMockFactory.createPaginatedEntities(page, limit, total);
    SellerRepositoryMock.list.mockResolvedValueOnce(brandsMock);

    const request = ListSellersRequestDTO.create({
      page,
      limit,
    });

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(SellerRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(SellerRepositoryMock.list).toHaveBeenCalledWith({
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
