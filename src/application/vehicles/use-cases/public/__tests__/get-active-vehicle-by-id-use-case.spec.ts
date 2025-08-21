import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { VehicleRepositoryMock } from '../../../../../test/vehicles/vehicle-repository-mock';
import { VehicleResponseDTO } from '../../../../../infra/vehicles/dtos/shared/vehicle-response-dto';
import { VehicleMockFactory } from '../../../../../test/vehicles/vehicle-mock-factory';
import { GetActiveVehicleByIdUseCase } from '../get-active-vehicle-by-id-use-case';

describe('GetActiveVehicleByIdUseCase', () => {
  let sut: GetActiveVehicleByIdUseCase;

  beforeEach(() => {
    sut = new GetActiveVehicleByIdUseCase(VehicleRepositoryMock);
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

  it('should throw a not found exception when vehicle is inactive', async () => {
    // Arrange
    const vehicleId = faker.string.uuid();
    const inactiveVehicle = VehicleMockFactory.createEntity({ active: false });

    VehicleRepositoryMock.findById.mockResolvedValueOnce(inactiveVehicle);

    // Act & Assert
    await expect(sut.execute(vehicleId)).rejects.toThrow(HttpException);

    // Assert
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findById).toHaveBeenCalledWith(vehicleId);
  });

  it('should return an active vehicle by id successfully', async () => {
    // Arrange
    const vehicleId = faker.string.uuid();
    const vehicleExists = VehicleMockFactory.createEntity({ active: true });

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
