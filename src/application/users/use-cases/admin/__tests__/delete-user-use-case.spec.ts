import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { DeleteUserUseCase } from '../delete-user-use-case';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';

describe('DeleteUserUseCase', () => {
  let sut: DeleteUserUseCase;

  beforeEach(() => {
    sut = new DeleteUserUseCase(UserRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when user does not exists', async () => {
    // Arrange
    const userId = faker.string.uuid();

    UserRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(userId)).rejects.toThrow(HttpException);

    // Assert
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(UserRepositoryMock.delete).not.toHaveBeenCalled();
  });

  it('should delete a user successfully', async () => {
    // Arrange
    const userId = faker.string.uuid();
    const userExists = UserMockFactory.createEntity();

    UserRepositoryMock.findById.mockResolvedValueOnce(userExists);

    // Act
    const result = await sut.execute(userId);

    // Assert
    expect(result).toBeUndefined();
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(UserRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.delete).toHaveBeenCalledWith(userId);
  });
});
