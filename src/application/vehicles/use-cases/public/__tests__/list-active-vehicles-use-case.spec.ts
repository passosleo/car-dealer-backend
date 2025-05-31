import { ListActiveVehiclesRequestDTO } from '../../../../../infra/vehicles/dtos/public/list-active-vehicles-request-dto';
import { VehicleMockFactory } from '../../../../../test/vehicles/vehicle-mock-factory';
import { VehicleRepositoryMock } from '../../../../../test/vehicles/vehicle-repository-mock';
import { ListActiveVehiclesUseCase } from '../list-active-vehicles-use-case';

describe('ListActiveVehiclesUseCase', () => {
  let sut: ListActiveVehiclesUseCase;

  beforeEach(() => {
    sut = new ListActiveVehiclesUseCase(VehicleRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated vehicles', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const vehiclesMock = VehicleMockFactory.createPaginatedEntities(page, limit, total);
    VehicleRepositoryMock.list.mockResolvedValueOnce(vehiclesMock);

    const request = ListActiveVehiclesRequestDTO.create({
      page,
      limit,
    });

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(VehicleRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
      status: 'active',
    });

    expect(result).toEqual(vehiclesMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
