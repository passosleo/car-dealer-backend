import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { GetSellerByIdUseCase } from '../get-seller-by-id-use-case';
import { SellerRepositoryMock } from '../../../../../test/sellers/seller-repository-mock';
import { SellerMockFactory } from '../../../../../test/sellers/seller-mock-factory';

describe('GetSellerByIdUseCase', () => {
  let sut: GetSellerByIdUseCase;

  beforeEach(() => {
    sut = new GetSellerByIdUseCase(SellerRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when seller does not exists', async () => {
    // Arrange
    const sellerId = faker.string.uuid();

    SellerRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(sellerId)).rejects.toThrow(HttpException);

    // Assert
    expect(SellerRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(SellerRepositoryMock.findById).toHaveBeenCalledWith(sellerId);
  });

  it('should return a seller by id successfully', async () => {
    // Arrange
    const sellerId = faker.string.uuid();
    const sellerExists = SellerMockFactory.createEntity();

    SellerRepositoryMock.findById.mockResolvedValueOnce(sellerExists);

    // Act
    const result = await sut.execute(sellerId);

    // Assert
    expect(result).toEqual(sellerExists);
    expect(SellerRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(SellerRepositoryMock.findById).toHaveBeenCalledWith(sellerId);
  });
});
