import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { GetVehicleByIdUseCase } from '../get-vehicle-by-id-use-case';
import { VehicleRepositoryMock } from '../../../../../test/vehicles/vehicle-repository-mock';
import { VehicleResponseDTO } from '../../../../../infra/vehicles/dtos/shared/vehicle-response-dto';
import { VehicleMockFactory } from '../../../../../test/vehicles/vehicle-mock-factory';

describe('GetVehicleByIdUseCase', () => {
  let sut: GetVehicleByIdUseCase;

  beforeEach(() => {
    sut = new GetVehicleByIdUseCase(VehicleRepositoryMock);
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
  });

  it('should return a vehicle by id successfully', async () => {
    // Arrange
    const vehicleId = faker.string.uuid();
    const vehicleExists = VehicleMockFactory.createEntity();

    VehicleRepositoryMock.findById.mockResolvedValueOnce(vehicleExists);

    // Act
    const result = await sut.execute(vehicleId);

    // Assert
    expect(result).toEqual(
      expect.objectContaining<VehicleResponseDTO>({
        vehicleId: vehicleExists.vehicleId,
        model: vehicleExists.model,
        year: vehicleExists.year,
        plate: vehicleExists.plate,
        description: vehicleExists.description,
        price: vehicleExists.price,
        mileage: vehicleExists.mileage,
        color: vehicleExists.color,
        transmission: vehicleExists.transmission,
        fuelType: vehicleExists.fuelType,
        doors: vehicleExists.doors,
        seats: vehicleExists.seats,
        horsepower: vehicleExists.horsepower,
        torque: vehicleExists.torque,
        driveTrain: vehicleExists.driveTrain,
        brand: vehicleExists.brand,
        category: vehicleExists.category,
        vehicleImages: expect.arrayContaining([expect.any(String)]),
        vehicleFeatures: expect.arrayContaining([expect.any(String)]),
        active: vehicleExists.active,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledWith(vehicleId);
  });
});
