import { WishlistResponseDTO } from '../../../../../infra/http/dtos/wishlist/wishlist-response-dto';
import { WishlistRepositoryMock } from '../../../../../test/repositories/wishlist-repository-mock';
import { HttpException } from '../../../../../infra/http/response/http-exception';
import { WishlistMockFactory } from '../../../../../test/factories/wishlist-mock-factory';
import { GetWishlistByIdUseCase } from '../../get-wishlist-by-id-use-case';

describe('GetWishlistByIdUseCase', () => {
  let sut: GetWishlistByIdUseCase;

  beforeEach(() => {
    sut = new GetWishlistByIdUseCase(WishlistRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when wishlist does not exist', async () => {
    WishlistRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute('wishlist-id')).rejects.toThrow(HttpException);

    expect(WishlistRepositoryMock.findById).toHaveBeenCalledTimes(1);
  });

  it('should return a wishlist by a given id', async () => {
    WishlistRepositoryMock.findById.mockResolvedValueOnce(WishlistMockFactory.createEntity());

    const result = await sut.execute('wishlist-id');

    expect(result).toBeInstanceOf(WishlistResponseDTO);
    expect(WishlistRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(WishlistRepositoryMock.findById).toHaveBeenCalledWith('wishlist-id');
  });
});
