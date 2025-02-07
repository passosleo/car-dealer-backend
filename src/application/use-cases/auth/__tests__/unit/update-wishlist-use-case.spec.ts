import { WishlistResponseDTO } from '../../../../../infra/http/dtos/wishlist/wishlist-response-dto';
import { WishlistRepositoryMock } from '../../../../../test/repositories/wishlist-repository-mock';
import { HttpException } from '../../../../../infra/http/response/http-exception';
import { WishlistMockFactory } from '../../../../../test/factories/wishlist-mock-factory';
import { UpdateWishlistUseCase } from '../../update-wishlist-use-case';
import { UpdateWishlistRequestDTO } from '../../../../../infra/http/dtos/wishlist/update-wishlist-request-dto';

describe('UpdateWishlistUseCase', () => {
  let sut: UpdateWishlistUseCase;

  beforeEach(() => {
    sut = new UpdateWishlistUseCase(WishlistRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when wishlist does not exist', async () => {
    WishlistRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(
      sut.execute(
        'wishlist-id',
        UpdateWishlistRequestDTO.create({
          name: 'new-item-name',
          description: 'new-item-description',
        }),
      ),
    ).rejects.toThrow(HttpException);

    expect(WishlistRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(WishlistRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update a wishlist by a given id', async () => {
    WishlistRepositoryMock.findById.mockResolvedValueOnce(WishlistMockFactory.createEntity());
    WishlistRepositoryMock.update.mockResolvedValueOnce(WishlistMockFactory.createEntity());

    const result = await sut.execute(
      'wishlist-id',
      UpdateWishlistRequestDTO.create({
        name: 'new-item-name',
        description: 'new-item-description',
      }),
    );

    expect(result).toBeInstanceOf(WishlistResponseDTO);
    expect(WishlistRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(WishlistRepositoryMock.findById).toHaveBeenCalledWith('wishlist-id');
    expect(WishlistRepositoryMock.update).toHaveBeenCalledTimes(1);
  });
});
