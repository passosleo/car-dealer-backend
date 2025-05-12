import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { DeleteProfileUseCase } from '../delete-profile-use-case';
import { ProfileRepositoryMock } from '../../../../../test/profiles/profile-repository-mock';
import { ProfileMockFactory } from '../../../../../test/profiles/profile-mock-factory';

describe('DeleteProfileUseCase', () => {
  let sut: DeleteProfileUseCase;

  beforeEach(() => {
    sut = new DeleteProfileUseCase(ProfileRepositoryMock);
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
    expect(ProfileRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should delete a profile successfully', async () => {
    // Arrange
    const profileId = faker.string.uuid();
    const profileExists = ProfileMockFactory.createEntity();

    ProfileRepositoryMock.findById.mockResolvedValueOnce(profileExists);

    // Act
    const result = await sut.execute(profileId);

    // Assert
    expect(result).toBeUndefined();
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(profileId);
    expect(ProfileRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.delete).toHaveBeenCalledWith(profileId);
  });
});
