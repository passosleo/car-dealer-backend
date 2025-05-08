import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ProfileRepositoryMock } from '../../../../../test/admin/repositories/profile-repository-mock';
import { GetProfileByIdUseCase } from '../get-profile-by-id-use-case';
import { ProfileMockFactory } from '../../../../../test/admin/factories/profile-mock-factory';

describe('GetProfileByIdUseCase', () => {
  let sut: GetProfileByIdUseCase;

  beforeEach(() => {
    sut = new GetProfileByIdUseCase(ProfileRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when profile does not exists', async () => {
    // Arrange
    const profileId = faker.string.uuid();

    ProfileRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(profileId)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(profileId);
  });

  it('should return a profile by id successfully', async () => {
    // Arrange
    const profileId = faker.string.uuid();
    const profileExists = ProfileMockFactory.createEntity();

    ProfileRepositoryMock.findById.mockResolvedValueOnce(profileExists);

    // Act
    const result = await sut.execute(profileId);

    // Assert
    expect(result).toEqual(profileExists);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(profileId);
  });
});
