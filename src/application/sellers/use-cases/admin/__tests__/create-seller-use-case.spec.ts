import { faker } from '@faker-js/faker';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { CreateSellerUseCase } from '../create-seller-use-case';
import { SellerRepositoryMock } from '../../../../../test/sellers/seller-repository-mock';
import { CreateSellerRequestDTO } from '../../../../../infra/sellers/dtos/admin/create-seller-request-dto';
import { SellerMockFactory } from '../../../../../test/sellers/seller-mock-factory';

describe('CreateSellerUseCase', () => {
  let sut: CreateSellerUseCase;

  beforeEach(() => {
    sut = new CreateSellerUseCase(SellerRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a unprocessable entity exception when image is not base64', async () => {
    // Arrange
    const requestWithInvalidImage = CreateSellerRequestDTO.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      customMessage: faker.lorem.sentence(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      image: 'invalid-image',
      active: true,
    });

    // Act & Assert
    await expect(sut.execute(requestWithInvalidImage)).rejects.toThrow(HttpException);

    // Assert
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(SellerRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a new seller successfully', async () => {
    // Arrange
    const request = CreateSellerRequestDTO.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      customMessage: faker.lorem.sentence(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      active: true,
    });
    const imageUrl = faker.image.url();
    const createdSeller = SellerMockFactory.createEntity({
      firstName: request.firstName,
      lastName: request.lastName,
      customMessage: request.customMessage,
      email: request.email,
      phone: request.phone,
      imageUrl: imageUrl,
      active: request.active,
    });

    ImageStorageMock.uploadImageBase64.mockResolvedValueOnce(imageUrl);
    SellerRepositoryMock.create.mockResolvedValueOnce(createdSeller);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(result).toEqual(
      expect.objectContaining({
        sellerId: createdSeller.sellerId,
        firstName: createdSeller.firstName,
        lastName: createdSeller.lastName,
        customMessage: createdSeller.customMessage,
        email: createdSeller.email,
        phone: createdSeller.phone,
        imageUrl: createdSeller.imageUrl,
        active: createdSeller.active,
        createdAt: createdSeller.createdAt,
        updatedAt: createdSeller.updatedAt,
      }),
    );
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledTimes(1);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledWith(request.image);
    expect(SellerRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(SellerRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: request.firstName,
        lastName: request.lastName,
        customMessage: request.customMessage,
        email: request.email,
        phone: request.phone,
        imageUrl,
        active: request.active,
      }),
    );
  });
});
