import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { DeleteSellerUseCase } from '../delete-seller-use-case';
import { SellerRepositoryMock } from '../../../../../test/sellers/seller-repository-mock';
import { SellerMockFactory } from '../../../../../test/sellers/seller-mock-factory';

describe('DeleteSellerUseCase', () => {
  let sut: DeleteSellerUseCase;

  beforeEach(() => {
    sut = new DeleteSellerUseCase(SellerRepositoryMock, ImageStorageMock);
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
    expect(SellerRepositoryMock.delete).not.toHaveBeenCalled();
    expect(ImageStorageMock.deleteImage).not.toHaveBeenCalled();
  });

  it('should delete a seller successfully', async () => {
    // Arrange
    const sellerId = faker.string.uuid();
    const sellerExists = SellerMockFactory.createEntity();

    SellerRepositoryMock.findById.mockResolvedValueOnce(sellerExists);

    // Act
    const result = await sut.execute(sellerId);

    // Assert
    expect(result).toBeUndefined();
    expect(SellerRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(SellerRepositoryMock.findById).toHaveBeenCalledWith(sellerId);
    expect(SellerRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(SellerRepositoryMock.delete).toHaveBeenCalledWith(sellerId);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledTimes(1);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledWith(sellerExists.imageUrl);
  });
});
