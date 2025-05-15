import { ListUsersRequestDTO } from '../../../../../infra/users/dtos/admin/list-users-request-dto';
import { VehicleMockFactory } from '../../../../../test/vehicles/vehicle-mock-factory';
import { VehicleRepositoryMock } from '../../../../../test/vehicles/vehicle-repository-mock';
import { ListVehiclesUseCase } from '../list-vehicles-use-case';

describe('ListVehiclesUseCase', () => {
  let sut: ListVehiclesUseCase;

  beforeEach(() => {
    sut = new ListVehiclesUseCase(VehicleRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated vehicles', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const request = ListUsersRequestDTO.create({
      page,
      limit,
    });
    const vehiclesMock = VehicleMockFactory.createPaginatedEntities(page, limit, total);
    VehicleRepositoryMock.list.mockResolvedValueOnce(vehiclesMock);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(VehicleRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(VehicleRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
    });

    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
