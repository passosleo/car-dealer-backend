import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { DeleteVehicleUseCase } from '../delete-vehicle-use-case';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { VehicleRepositoryMock } from '../../../../../test/vehicles/vehicle-repository-mock';
import { VehicleMockFactory } from '../../../../../test/vehicles/vehicle-mock-factory';

describe('DeleteVehicleUseCase', () => {
  let sut: DeleteVehicleUseCase;

  beforeEach(() => {
    sut = new DeleteVehicleUseCase(VehicleRepositoryMock, ImageStorageMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when vehicle does not exists', async () => {
    // Arrange
    const vehicleId = faker.string.uuid();

    VehicleRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(vehicleId)).rejects.toThrow(HttpException);

    // Assert
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledWith(vehicleId);
    expect(VehicleRepositoryMock.delete).not.toHaveBeenCalled();
    expect(ImageStorageMock.deleteImage).not.toHaveBeenCalled();
  });

  it('should delete a vehicle successfully', async () => {
    // Arrange
    const vehicleId = faker.string.uuid();
    const vehicleExists = VehicleMockFactory.createEntity({
      vehicleImages: [faker.image.url(), faker.image.url()],
    });

    VehicleRepositoryMock.findById.mockResolvedValueOnce(vehicleExists);

    // Act
    const result = await sut.execute(vehicleId);

    // Assert
    expect(result).toBeUndefined();
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledWith(vehicleId);
    expect(VehicleRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.delete).toHaveBeenCalledWith(vehicleId);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledTimes(vehicleExists.vehicleImages.length);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledWith(vehicleExists.vehicleImages[0]);
    expect(ImageStorageMock.deleteImage).toHaveBeenCalledWith(vehicleExists.vehicleImages[1]);
  });
});
