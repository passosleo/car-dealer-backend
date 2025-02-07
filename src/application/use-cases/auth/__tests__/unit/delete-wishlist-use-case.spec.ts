import { WishlistRepositoryMock } from '../../../../../test/repositories/wishlist-repository-mock';
import { DeleteWishlistUseCase } from '../../delete-wishlist-use-case';
import { HttpException } from '../../../../../infra/http/response/http-exception';
import { WishlistMockFactory } from '../../../../../test/factories/wishlist-mock-factory';

describe('DeleteWishlistUseCase', () => {
  let sut: DeleteWishlistUseCase;

  beforeEach(() => {
    sut = new DeleteWishlistUseCase(WishlistRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when wishlist does not exist', async () => {
    WishlistRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute('wishlist-id')).rejects.toThrow(HttpException);

    expect(WishlistRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(WishlistRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should delete a wishlist by a given id', async () => {
    WishlistRepositoryMock.findById.mockResolvedValueOnce(WishlistMockFactory.createEntity());

    const result = await sut.execute('wishlist-id');

    expect(result).toBeUndefined();
    expect(WishlistRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(WishlistRepositoryMock.findById).toHaveBeenCalledWith('wishlist-id');
    expect(WishlistRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(WishlistRepositoryMock.delete).toHaveBeenCalledWith('wishlist-id');
  });
});
