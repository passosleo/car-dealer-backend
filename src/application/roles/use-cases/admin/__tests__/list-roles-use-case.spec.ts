import { RoleMockFactory } from '../../../../../test/roles/role-mock-factory';
import { RoleRepositoryMock } from '../../../../../test/roles/role-repository-mock';
import { ListRolesUseCase } from '../list-roles-use-case';

describe('ListRolesUseCase', () => {
  let sut: ListRolesUseCase;

  beforeEach(() => {
    sut = new ListRolesUseCase(RoleRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list roles', async () => {
    // Arrange
    const total = 10;
    const rolesMock = RoleMockFactory.createEntities(total);
    RoleRepositoryMock.list.mockResolvedValueOnce(rolesMock);

    // Act
    const result = await sut.execute();

    // Assert
    expect(RoleRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(RoleRepositoryMock.list).toHaveBeenCalledWith();
    expect(result).toEqual(rolesMock);
    expect(result.length).toEqual(total);
  });
});
