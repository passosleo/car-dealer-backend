import { ListActiveSellersRequestDTO } from '../../../../../infra/sellers/dtos/public/list-active-sellers-request-dto';
import { SellerMockFactory } from '../../../../../test/sellers/seller-mock-factory';
import { SellerRepositoryMock } from '../../../../../test/sellers/seller-repository-mock';
import { ListActiveSellersUseCase } from '../list-active-sellers-use-case';

describe('ListActiveSellersUseCase', () => {
  let sut: ListActiveSellersUseCase;

  beforeEach(() => {
    sut = new ListActiveSellersUseCase(SellerRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated sellers', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const sellersMock = SellerMockFactory.createPaginatedEntities(page, limit, total);
    SellerRepositoryMock.list.mockResolvedValueOnce(sellersMock);

    const request = ListActiveSellersRequestDTO.create({
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
      status: 'active',
    });

    expect(result).toEqual(sellersMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
