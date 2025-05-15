import { ListUsersRequestDTO } from '../../../../../infra/users/dtos/admin/list-users-request-dto';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { ListUsersUseCase } from '../list-users-use-case';

describe('ListUsersUseCase', () => {
  let sut: ListUsersUseCase;

  beforeEach(() => {
    sut = new ListUsersUseCase(UserRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated users', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const request = ListUsersRequestDTO.create({
      page,
      limit,
    });
    const usersMock = UserMockFactory.createPaginatedEntities(page, limit, total);
    UserRepositoryMock.list.mockResolvedValueOnce(usersMock);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(UserRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
    });

    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
