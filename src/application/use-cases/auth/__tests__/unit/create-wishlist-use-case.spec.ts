import { CreateWishlistUseCase } from '../../create-wishlist-use-case';
import { WishlistRepositoryMock } from '../../../../../test/repositories/wishlist-repository-mock';
import { CreateWishlistRequestDTO } from '../../../../../infra/http/dtos/wishlist/create-wishlist-request-dto';
import { WishlistMockFactory } from '../../../../../test/factories/wishlist-mock-factory';
import { WishlistResponseDTO } from '../../../../../infra/http/dtos/wishlist/wishlist-response-dto';

describe('CreateWishlistUseCase', () => {
  let sut: CreateWishlistUseCase;

  beforeEach(() => {
    sut = new CreateWishlistUseCase(WishlistRepositoryMock);
    jest.clearAllMocks();
  });

  it('should create a wishlist successfully', async () => {
    WishlistRepositoryMock.create.mockResolvedValueOnce(WishlistMockFactory.createEntity());

    const result = await sut.execute(
      CreateWishlistRequestDTO.create({
        name: 'wishlist-name',
        description: 'wishlist-description',
        priority: 10,
      }),
    );

    expect(result).toBeInstanceOf(WishlistResponseDTO);
    expect(WishlistRepositoryMock.create).toHaveBeenCalledTimes(1);
  });
});
