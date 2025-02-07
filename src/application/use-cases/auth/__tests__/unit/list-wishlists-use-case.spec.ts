import { WishlistRepositoryMock } from '../../../../../test/repositories/wishlist-repository-mock';
import { WishlistMockFactory } from '../../../../../test/factories/wishlist-mock-factory';
import { ListWishlistsUseCase } from '../../list-wishlists-use-case';
import { WishlistResponseDTO } from '../../../../../infra/http/dtos/wishlist/wishlist-response-dto';

describe('ListWishlistsUseCase', () => {
  let sut: ListWishlistsUseCase;

  beforeEach(() => {
    sut = new ListWishlistsUseCase(WishlistRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return a list of wishlists', async () => {
    WishlistRepositoryMock.list.mockResolvedValueOnce(WishlistMockFactory.createEntities(5));

    const result = await sut.execute();

    expect(result.length).toBe(5);
    expect(result[0]).toBeInstanceOf(WishlistResponseDTO);
    expect(WishlistRepositoryMock.list).toHaveBeenCalledTimes(1);
  });
});
