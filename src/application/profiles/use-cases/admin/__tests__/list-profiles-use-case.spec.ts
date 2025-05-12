import { ListProfilesRequestDTO } from '../../../../../infra/profiles/dtos/admin/list-profiles-request-dto';
import { ProfileMockFactory } from '../../../../../test/profiles/profile-mock-factory';
import { ProfileRepositoryMock } from '../../../../../test/profiles/profile-repository-mock';
import { ListProfilesUseCase } from '../list-profiles-use-case';

describe('ListProfilesUseCase', () => {
  let sut: ListProfilesUseCase;

  beforeEach(() => {
    sut = new ListProfilesUseCase(ProfileRepositoryMock);
    jest.clearAllMocks();
  });

  it('should list paginated profiles', async () => {
    // Arrange
    const page = 1;
    const limit = 10;
    const total = 100;
    const request = ListProfilesRequestDTO.create({
      page,
      limit,
    });
    const profilesMock = ProfileMockFactory.createPaginatedEntities(page, limit, total);
    ProfileRepositoryMock.list.mockResolvedValueOnce(profilesMock);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(ProfileRepositoryMock.list).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.list).toHaveBeenCalledWith({
      page,
      limit,
    });

    expect(result).toEqual(profilesMock);
    expect(result.items.length).toEqual(limit);
    expect(result.total).toEqual(total);
    expect(result.page).toEqual(page);
    expect(result.totalPages).toEqual(Math.ceil(total / limit));
  });
});
