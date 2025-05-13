import { faker } from '@faker-js/faker';
import { UpdateSellerUseCase } from '../update-seller-use-case';
import { UpdateSellerRequestDTO } from '../../../../../infra/sellers/dtos/admin/update-seller-request-dto';
import { SellerRepositoryMock } from '../../../../../test/sellers/seller-repository-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { SellerMockFactory } from '../../../../../test/sellers/seller-mock-factory';

describe('UpdateSellerUseCase', () => {
  let sut: UpdateSellerUseCase;

  beforeEach(() => {
    sut = new UpdateSellerUseCase(SellerRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  const createRequest = (image: string | null): UpdateSellerRequestDTO =>
    UpdateSellerRequestDTO.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      image,
      customMessage: faker.lorem.sentence(),
      active: true,
    });

  it('should throw a not found exception when seller does not exist', async () => {
    const sellerId = faker.string.uuid();
    const request = createRequest('data:image/png;base64,BASE64DATA');

    SellerRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(sellerId, request)).rejects.toThrow(HttpException);

    expect(SellerRepositoryMock.findById).toHaveBeenCalledWith(sellerId);
    expect(SellerRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should upload image if base64 image is provided and current image is null', async () => {
    const sellerId = faker.string.uuid();
    const request = createRequest('data:image/png;base64,BASE64DATA');

    const existingSeller = SellerMockFactory.createEntity({
      sellerId,
      imageUrl: null,
    });

    const uploadedImageUrl = faker.image.url();

    const updatedSeller = {
      ...existingSeller,
      ...request,
      imageUrl: uploadedImageUrl,
    };

    SellerRepositoryMock.findById.mockResolvedValueOnce(existingSeller);
    ImageStorageMock.uploadImageBase64.mockResolvedValueOnce(uploadedImageUrl);
    SellerRepositoryMock.update.mockResolvedValueOnce(updatedSeller);

    const result = await sut.execute(sellerId, request);

    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledWith(request.image);
    expect(SellerRepositoryMock.update).toHaveBeenCalledWith(
      sellerId,
      expect.objectContaining({
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        customMessage: request.customMessage,
        active: request.active,
        imageUrl: uploadedImageUrl,
      }),
    );
    expect(result).toEqual(expect.objectContaining({ sellerId: existingSeller.sellerId }));
  });

  it('should update image if base64 image is provided and current image exists', async () => {
    const sellerId = faker.string.uuid();
    const request = createRequest('data:image/png;base64,IMGDATA');

    const currentImageUrl = faker.image.url();
    const existingSeller = SellerMockFactory.createEntity({
      sellerId,
      imageUrl: currentImageUrl,
    });

    const updatedImageUrl = faker.image.url();
    const updatedSeller = {
      ...existingSeller,
      ...request,
      imageUrl: updatedImageUrl,
    };

    SellerRepositoryMock.findById.mockResolvedValueOnce(existingSeller);
    ImageStorageMock.updateImageBase64.mockResolvedValueOnce(updatedImageUrl);
    SellerRepositoryMock.update.mockResolvedValueOnce(updatedSeller);

    const result = await sut.execute(sellerId, request);

    expect(ImageStorageMock.updateImageBase64).toHaveBeenCalledWith(currentImageUrl, request.image);
    expect(SellerRepositoryMock.update).toHaveBeenCalledWith(
      sellerId,
      expect.objectContaining({
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        customMessage: request.customMessage,
        active: request.active,
        imageUrl: updatedImageUrl,
      }),
    );
    expect(result).toEqual(expect.objectContaining({ sellerId: existingSeller.sellerId }));
  });

  it('should not change image if image is not base64 (URL)', async () => {
    const sellerId = faker.string.uuid();
    const currentImageUrl = faker.image.url();
    const request = createRequest(currentImageUrl);

    const existingSeller = SellerMockFactory.createEntity({
      sellerId,
      imageUrl: currentImageUrl,
    });

    const updatedSeller = {
      ...existingSeller,
      ...request,
      imageUrl: currentImageUrl,
    };

    SellerRepositoryMock.findById.mockResolvedValueOnce(existingSeller);
    SellerRepositoryMock.update.mockResolvedValueOnce(updatedSeller);

    const result = await sut.execute(sellerId, request);

    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(SellerRepositoryMock.update).toHaveBeenCalledWith(
      sellerId,
      expect.objectContaining({
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        customMessage: request.customMessage,
        active: request.active,
        imageUrl: currentImageUrl,
      }),
    );
    expect(result).toEqual(expect.objectContaining({ sellerId: existingSeller.sellerId }));
  });

  it('should set image to null if image is not provided in request', async () => {
    const sellerId = faker.string.uuid();
    const request = createRequest(null);

    const existingSeller = SellerMockFactory.createEntity({
      sellerId,
      imageUrl: faker.image.url(),
    });

    const updatedSeller = {
      ...existingSeller,
      ...request,
      imageUrl: null,
    };

    SellerRepositoryMock.findById.mockResolvedValueOnce(existingSeller);
    SellerRepositoryMock.update.mockResolvedValueOnce(updatedSeller);

    const result = await sut.execute(sellerId, request);

    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(SellerRepositoryMock.update).toHaveBeenCalledWith(
      sellerId,
      expect.objectContaining({
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        customMessage: request.customMessage,
        active: request.active,
        imageUrl: null,
      }),
    );
    expect(result).toEqual(expect.objectContaining({ sellerId: existingSeller.sellerId }));
  });
});
