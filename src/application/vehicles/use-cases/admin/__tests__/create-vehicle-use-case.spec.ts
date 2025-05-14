import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { CreateVehicleRequestDTO } from '../../../../../infra/vehicles/dtos/admin/create-vehicle-request-dto';
import { VehicleRepositoryMock } from '../../../../../test/vehicles/vehicle-repository-mock';
import { CreateVehicleUseCase } from '../create-vehicle-use-case';
import { CategoryRepositoryMock } from '../../../../../test/categories/category-repository-mock';
import { BrandRepositoryMock } from '../../../../../test/brands/brand-repository-mock';
import { ImageStorageMock } from '../../../../../test/shared/storages/image-storage-mock';
import { VehicleMockFactory } from '../../../../../test/vehicles/vehicle-mock-factory';
import { CategoryMockFactory } from '../../../../../test/categories/category-mock-factory';
import { BrandMockFactory } from '../../../../../test/brands/brand-mock-factory';
import { BrandResponseDTO } from '../../../../../infra/brands/dtos/shared/brand-response-dto';
import { CategoryResponseDTO } from '../../../../../infra/categories/dtos/shared/category-response-dto';
import { VehicleResponseDTO } from '../../../../../infra/vehicles/dtos/shared/vehicle-response-dto';

describe('CreateVehicleUseCase', () => {
  let sut: CreateVehicleUseCase;

  beforeEach(() => {
    sut = new CreateVehicleUseCase(
      VehicleRepositoryMock,
      CategoryRepositoryMock,
      BrandRepositoryMock,
      ImageStorageMock,
    );
    jest.clearAllMocks();
  });

  it('should throw a conflict exception when a vehicle with the same plate already exists', async () => {
    // Arrange
    const request = CreateVehicleRequestDTO.create({
      model: faker.vehicle.model(),
      year: faker.date.past().getFullYear(),
      plate: faker.vehicle.vrm(),
      description: faker.lorem.sentence(),
      price: faker.number.int({ min: 10000, max: 50000 }),
      mileage: faker.number.int({ min: 0, max: 200000 }),
      color: faker.color.human(),
      transmission: faker.helpers.arrayElement(['manual', 'automatic']),
      fuelType: faker.helpers.arrayElement(['gasoline', 'diesel', 'electric']),
      doors: faker.number.int({ min: 2, max: 5 }),
      seats: faker.number.int({ min: 2, max: 7 }),
      horsepower: faker.number.int({ min: 50, max: 500 }),
      torque: faker.number.int({ min: 100, max: 500 }),
      driveTrain: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD']),
      brandId: faker.string.uuid(),
      categoryId: faker.string.uuid(),
      vehicleImages: [faker.image.url()],
      vehicleFeatures: [faker.lorem.word()],
      active: true,
    });

    const vehicleExists = VehicleMockFactory.createEntity({
      plate: request.plate,
    });
    VehicleRepositoryMock.findByPlate.mockResolvedValueOnce(vehicleExists);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledWith(request.plate);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(request.categoryId);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(request.brandId);
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(VehicleRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a unprocessable entity exception when category does not exists', async () => {
    // Arrange
    const request = CreateVehicleRequestDTO.create({
      model: faker.vehicle.model(),
      year: faker.date.past().getFullYear(),
      plate: faker.vehicle.vrm(),
      description: faker.lorem.sentence(),
      price: faker.number.int({ min: 10000, max: 50000 }),
      mileage: faker.number.int({ min: 0, max: 200000 }),
      color: faker.color.human(),
      transmission: faker.helpers.arrayElement(['manual', 'automatic']),
      fuelType: faker.helpers.arrayElement(['gasoline', 'diesel', 'electric']),
      doors: faker.number.int({ min: 2, max: 5 }),
      seats: faker.number.int({ min: 2, max: 7 }),
      horsepower: faker.number.int({ min: 50, max: 500 }),
      torque: faker.number.int({ min: 100, max: 500 }),
      driveTrain: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD']),
      brandId: faker.string.uuid(),
      categoryId: faker.string.uuid(),
      vehicleImages: [faker.image.url()],
      vehicleFeatures: [faker.lorem.word()],
      active: true,
    });

    VehicleRepositoryMock.findByPlate.mockResolvedValueOnce(null);
    CategoryRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledWith(request.plate);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(request.categoryId);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(request.brandId);
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(VehicleRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a unprocessable entity exception when brand does not exists', async () => {
    // Arrange
    const request = CreateVehicleRequestDTO.create({
      model: faker.vehicle.model(),
      year: faker.date.past().getFullYear(),
      plate: faker.vehicle.vrm(),
      description: faker.lorem.sentence(),
      price: faker.number.int({ min: 10000, max: 50000 }),
      mileage: faker.number.int({ min: 0, max: 200000 }),
      color: faker.color.human(),
      transmission: faker.helpers.arrayElement(['manual', 'automatic']),
      fuelType: faker.helpers.arrayElement(['gasoline', 'diesel', 'electric']),
      doors: faker.number.int({ min: 2, max: 5 }),
      seats: faker.number.int({ min: 2, max: 7 }),
      horsepower: faker.number.int({ min: 50, max: 500 }),
      torque: faker.number.int({ min: 100, max: 500 }),
      driveTrain: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD']),
      brandId: faker.string.uuid(),
      categoryId: faker.string.uuid(),
      vehicleImages: [faker.image.url()],
      vehicleFeatures: [faker.lorem.word()],
      active: true,
    });

    VehicleRepositoryMock.findByPlate.mockResolvedValueOnce(null);
    const categoryExists = CategoryMockFactory.createEntity({
      categoryId: request.categoryId,
    });
    CategoryRepositoryMock.findById.mockResolvedValueOnce(categoryExists);
    BrandRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledWith(request.plate);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(request.categoryId);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(request.brandId);
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(VehicleRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a unprocessable entity exception when some images are not valid base64', async () => {
    // Arrange
    const request = CreateVehicleRequestDTO.create({
      model: faker.vehicle.model(),
      year: faker.date.past().getFullYear(),
      plate: faker.vehicle.vrm(),
      description: faker.lorem.sentence(),
      price: faker.number.int({ min: 10000, max: 50000 }),
      mileage: faker.number.int({ min: 0, max: 200000 }),
      color: faker.color.human(),
      transmission: faker.helpers.arrayElement(['manual', 'automatic']),
      fuelType: faker.helpers.arrayElement(['gasoline', 'diesel', 'electric']),
      doors: faker.number.int({ min: 2, max: 5 }),
      seats: faker.number.int({ min: 2, max: 7 }),
      horsepower: faker.number.int({ min: 50, max: 500 }),
      torque: faker.number.int({ min: 100, max: 500 }),
      driveTrain: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD']),
      brandId: faker.string.uuid(),
      categoryId: faker.string.uuid(),
      vehicleImages: [faker.image.url(), 'invalid-image'],
      vehicleFeatures: [faker.lorem.word()],
      active: true,
    });

    VehicleRepositoryMock.findByPlate.mockResolvedValueOnce(null);
    const categoryExists = CategoryMockFactory.createEntity({
      categoryId: request.categoryId,
    });
    CategoryRepositoryMock.findById.mockResolvedValueOnce(categoryExists);
    const brandExists = BrandMockFactory.createEntity({
      brandId: request.brandId,
    });
    BrandRepositoryMock.findById.mockResolvedValueOnce(brandExists);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledWith(request.plate);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(request.categoryId);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(request.brandId);
    expect(ImageStorageMock.uploadImageBase64).not.toHaveBeenCalled();
    expect(VehicleRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a new vehicle successfully', async () => {
    // Arrange
    const request = CreateVehicleRequestDTO.create({
      model: faker.vehicle.model(),
      year: faker.date.past().getFullYear(),
      plate: faker.vehicle.vrm(),
      description: faker.lorem.sentence(),
      price: faker.number.int({ min: 10000, max: 50000 }),
      mileage: faker.number.int({ min: 0, max: 200000 }),
      color: faker.color.human(),
      transmission: faker.helpers.arrayElement(['manual', 'automatic']),
      fuelType: faker.helpers.arrayElement(['gasoline', 'diesel', 'electric']),
      doors: faker.number.int({ min: 2, max: 5 }),
      seats: faker.number.int({ min: 2, max: 7 }),
      horsepower: faker.number.int({ min: 50, max: 500 }),
      torque: faker.number.int({ min: 100, max: 500 }),
      driveTrain: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD']),
      brandId: faker.string.uuid(),
      categoryId: faker.string.uuid(),
      vehicleImages: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'],
      vehicleFeatures: [faker.lorem.word()],
      active: true,
    });

    VehicleRepositoryMock.findByPlate.mockResolvedValueOnce(null);
    const categoryExists = CategoryMockFactory.createEntity({
      categoryId: request.categoryId,
    });
    CategoryRepositoryMock.findById.mockResolvedValueOnce(categoryExists);
    const brandExists = BrandMockFactory.createEntity({
      brandId: request.brandId,
    });
    BrandRepositoryMock.findById.mockResolvedValueOnce(brandExists);

    const imageUrl = faker.image.url();
    ImageStorageMock.uploadImageBase64.mockResolvedValueOnce(imageUrl);

    const createdVehicle = VehicleMockFactory.createEntity({
      ...request,
      brand: brandExists,
      category: categoryExists,
      vehicleImages: [imageUrl],
    });
    VehicleRepositoryMock.create.mockResolvedValueOnce(createdVehicle);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(result).toEqual(
      expect.objectContaining<VehicleResponseDTO>({
        vehicleId: createdVehicle.vehicleId,
        model: request.model,
        year: request.year,
        plate: request.plate,
        description: request.description,
        price: request.price,
        mileage: request.mileage,
        color: request.color,
        transmission: request.transmission,
        fuelType: request.fuelType,
        doors: request.doors,
        seats: request.seats,
        horsepower: request.horsepower,
        torque: request.torque,
        driveTrain: request.driveTrain,
        brand: expect.objectContaining<BrandResponseDTO>(brandExists),
        category: expect.objectContaining<CategoryResponseDTO>(categoryExists),
        vehicleImages: expect.arrayContaining([expect.any(String)]),
        vehicleFeatures: expect.arrayContaining([expect.any(String)]),
        active: request.active,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.findByPlate).toHaveBeenCalledWith(request.plate);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(CategoryRepositoryMock.findById).toHaveBeenCalledWith(request.categoryId);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(request.brandId);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledTimes(1);
    expect(ImageStorageMock.uploadImageBase64).toHaveBeenCalledWith(request.vehicleImages[0]);
    expect(VehicleRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: request.model,
        year: request.year,
        plate: request.plate,
        description: request.description,
        price: request.price,
        mileage: request.mileage,
        color: request.color,
        transmission: request.transmission,
        fuelType: request.fuelType,
        doors: request.doors,
        seats: request.seats,
        horsepower: request.horsepower,
        torque: request.torque,
        driveTrain: request.driveTrain,
        brand: brandExists,
        category: categoryExists,
        vehicleImages: [imageUrl],
        vehicleFeatures: request.vehicleFeatures,
        active: request.active,
      }),
    );
  });
});
