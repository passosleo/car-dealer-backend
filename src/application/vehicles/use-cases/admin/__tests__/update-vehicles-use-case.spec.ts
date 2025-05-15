import { faker } from '@faker-js/faker';
import { UpdateVehicleUseCase } from '../update-vehicle-use-case';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { UpdateVehicleRequestDTO } from '../../../../../infra/vehicles/dtos/admin/update-vehicle-request-dto';
import { VehicleMockFactory } from '../../../../../test/vehicles/vehicle-mock-factory';
import { BrandRepositoryMock } from '../../../../../test/brands/brand-repository-mock';
import { CategoryRepositoryMock } from '../../../../../test/categories/category-repository-mock';
import { VehicleRepositoryMock } from '../../../../../test/vehicles/vehicle-repository-mock';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';

function makeUpdateVehicleRequestDTO(overrides = {}): UpdateVehicleRequestDTO {
  return UpdateVehicleRequestDTO.create({
    model: faker.vehicle.model(),
    year: faker.number.int({ min: 1990, max: 2025 }),
    plate: faker.vehicle.vrm(),
    description: faker.lorem.sentence(),
    price: faker.number.float({ min: 1000, max: 100000 }),
    mileage: faker.number.int({ min: 0, max: 200000 }),
    color: faker.color.human(),
    transmission: faker.helpers.arrayElement(['manual', 'automatic', null]),
    fuelType: faker.helpers.arrayElement(['gasoline', 'diesel', 'electric', null]),
    doors: faker.helpers.arrayElement([2, 3, 4, 5, null]),
    seats: faker.helpers.arrayElement([2, 4, 5, 7, null]),
    horsepower: faker.number.int({ min: 50, max: 500 }),
    torque: faker.number.int({ min: 50, max: 500 }),
    driveTrain: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD', null]),
    brandId: faker.string.uuid(),
    categoryId: faker.string.uuid(),
    active: true,
    vehicleImages: [],
    vehicleFeatures: [],
    ...overrides,
  });
}

describe('UpdateVehicleUseCase', () => {
  let sut: UpdateVehicleUseCase;

  beforeEach(() => {
    sut = new UpdateVehicleUseCase(
      VehicleRepositoryMock,
      CategoryRepositoryMock,
      BrandRepositoryMock,
      ImageStorageMock,
    );
    jest.clearAllMocks();
  });

  it('should throw not found if vehicle does not exist', async () => {
    const vehicleId = faker.string.uuid();
    const request = makeUpdateVehicleRequestDTO();

    VehicleRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(vehicleId, request)).rejects.toThrow(HttpException);

    expect(VehicleRepositoryMock.findById).toHaveBeenCalledWith(vehicleId);
    expect(VehicleRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw conflict if new plate already exists', async () => {
    const vehicleId = faker.string.uuid();
    const existingVehicle = VehicleMockFactory.createEntity({ vehicleId });
    const request = makeUpdateVehicleRequestDTO({
      plate: 'NEW1234',
      brandId: existingVehicle.brand.brandId,
      categoryId: existingVehicle.category.categoryId,
    });

    const conflictVehicle = VehicleMockFactory.createEntity({ plate: request.plate });

    VehicleRepositoryMock.findById.mockResolvedValueOnce(existingVehicle);
    VehicleRepositoryMock.findByPlate.mockResolvedValueOnce(conflictVehicle);

    await expect(sut.execute(vehicleId, request)).rejects.toThrow(HttpException);

    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledWith(request.plate);
    expect(VehicleRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw if new category does not exist', async () => {
    const vehicleId = faker.string.uuid();
    const existingVehicle = VehicleMockFactory.createEntity({ vehicleId });
    const request = makeUpdateVehicleRequestDTO({
      plate: existingVehicle.plate,
      brandId: existingVehicle.brand.brandId,
      categoryId: faker.string.uuid(), // diferente
    });

    VehicleRepositoryMock.findById.mockResolvedValueOnce(existingVehicle);
    CategoryRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(vehicleId, request)).rejects.toThrow(HttpException);

    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(request.categoryId);
    expect(VehicleRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw if new brand does not exist', async () => {
    const vehicleId = faker.string.uuid();
    const existingVehicle = VehicleMockFactory.createEntity({ vehicleId });
    const request = makeUpdateVehicleRequestDTO({
      plate: existingVehicle.plate,
      brandId: faker.string.uuid(), // diferente
      categoryId: existingVehicle.category.categoryId,
    });

    VehicleRepositoryMock.findById.mockResolvedValueOnce(existingVehicle);
    BrandRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(vehicleId, request)).rejects.toThrow(HttpException);

    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(request.brandId);
    expect(VehicleRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update images if base64 images are provided', async () => {
    const vehicleId = faker.string.uuid();
    const base64Image = 'data:image/png;base64,AAA';
    const updatedImageUrl = faker.image.url();

    const existingVehicle = VehicleMockFactory.createEntity({
      vehicleId,
      vehicleImages: ['old-image-url-1'],
    });

    const request = makeUpdateVehicleRequestDTO({
      plate: existingVehicle.plate,
      brandId: existingVehicle.brand.brandId,
      categoryId: existingVehicle.category.categoryId,
      vehicleImages: [base64Image],
    });

    VehicleRepositoryMock.findById.mockResolvedValueOnce(existingVehicle);
    BrandRepositoryMock.findById.mockResolvedValueOnce(existingVehicle.brand);
    CategoryRepositoryMock.findById.mockResolvedValueOnce(existingVehicle.category);
    ImageStorageMock.updateImageBase64.mockResolvedValueOnce(updatedImageUrl);
    VehicleRepositoryMock.update.mockResolvedValueOnce({
      ...existingVehicle,
      vehicleImages: [updatedImageUrl],
    });

    const result = await sut.execute(vehicleId, request);

    expect(ImageStorageMock.updateImageBase64).toHaveBeenCalledWith('old-image-url-1', base64Image);
    expect(result.vehicleImages).toContain(updatedImageUrl);
  });

  it('should skip image update if images are not base64', async () => {
    const vehicleId = faker.string.uuid();
    const imageUrl = faker.image.url();

    const existingVehicle = VehicleMockFactory.createEntity({
      vehicleId,
      vehicleImages: [imageUrl],
    });

    const request = makeUpdateVehicleRequestDTO({
      plate: existingVehicle.plate,
      brandId: existingVehicle.brand.brandId,
      categoryId: existingVehicle.category.categoryId,
      vehicleImages: [imageUrl],
    });

    VehicleRepositoryMock.findById.mockResolvedValueOnce(existingVehicle);
    BrandRepositoryMock.findById.mockResolvedValueOnce(existingVehicle.brand);
    CategoryRepositoryMock.findById.mockResolvedValueOnce(existingVehicle.category);
    VehicleRepositoryMock.update.mockResolvedValueOnce({
      ...existingVehicle,
      vehicleImages: [imageUrl],
    });

    const result = await sut.execute(vehicleId, request);

    expect(ImageStorageMock.updateImageBase64).not.toHaveBeenCalled();
    expect(result.vehicleImages).toContain(imageUrl);
  });
});
