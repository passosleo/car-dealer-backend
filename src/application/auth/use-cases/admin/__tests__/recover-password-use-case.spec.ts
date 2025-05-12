import { faker } from '@faker-js/faker';
import { RecoverPasswordUseCase } from '../recover-password-use-case';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { UserPasswordRecoverAttemptRepositoryMock } from '../../../../../test/users/user-password-recover-attempt-repository-mock';
import { EncrypionServiceMock } from '../../../../../test/shared/services/encryption-service-mock';
import { HashServiceMock } from '../../../../../test/shared/services/hash-service-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { UserPasswordRecoverAttemptMockFactory } from '../../../../../test/users/user-password-recover-attempt-mock-factory';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';
import { RecoverPasswordRequestDTO } from '../../../../../infra/auth/dtos/admin/recover-password-request-dto';

describe('RecoverPasswordUseCase', () => {
  let sut: RecoverPasswordUseCase;

  beforeEach(() => {
    sut = new RecoverPasswordUseCase(
      UserRepositoryMock,
      UserPasswordRecoverAttemptRepositoryMock,
      EncrypionServiceMock,
      HashServiceMock,
    );
    jest.clearAllMocks();
  });

  it('should throw a unauthorized exception when token is expired', async () => {
    // Arrange
    const request = RecoverPasswordRequestDTO.create({
      token: faker.string.uuid(),
      newPassword: faker.internet.password(),
    });

    EncrypionServiceMock.decrypt.mockReturnValue({
      userId: faker.string.uuid(),
      expiresAt: new Date(Date.now() - 1000), // Token expired
    });

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(request.token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).not.toHaveBeenCalled();
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).not.toHaveBeenCalled();
    expect(HashServiceMock.hash).not.toHaveBeenCalled();
    expect(UserPasswordRecoverAttemptRepositoryMock.delete).not.toHaveBeenCalled();
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw a not found exception when user is not found', async () => {
    // Arrange
    const request = RecoverPasswordRequestDTO.create({
      token: faker.string.uuid(),
      newPassword: faker.internet.password(),
    });

    const userId = faker.string.uuid();

    EncrypionServiceMock.decrypt.mockReturnValue({
      userId,
      expiresAt: new Date(Date.now() + 1000), // Token valid
    });

    UserRepositoryMock.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(request.token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).not.toHaveBeenCalled();
    expect(HashServiceMock.hash).not.toHaveBeenCalled();
    expect(UserPasswordRecoverAttemptRepositoryMock.delete).not.toHaveBeenCalled();
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw a unauthorized exception when user password recover attempt is not found', async () => {
    // Arrange
    const request = RecoverPasswordRequestDTO.create({
      token: faker.string.uuid(),
      newPassword: faker.internet.password(),
    });

    const userId = faker.string.uuid();

    EncrypionServiceMock.decrypt.mockReturnValue({
      userId,
      expiresAt: new Date(Date.now() + 1000), // Token valid
    });

    UserRepositoryMock.findById.mockResolvedValue({} as any);
    UserPasswordRecoverAttemptRepositoryMock.findByUserId.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(request.token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledWith(userId);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledTimes(1);
    expect(HashServiceMock.hash).not.toHaveBeenCalled();
    expect(UserPasswordRecoverAttemptRepositoryMock.delete).not.toHaveBeenCalled();
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update user password and delete user password recover attempt', async () => {
    // Arrange
    const request = RecoverPasswordRequestDTO.create({
      token: faker.string.uuid(),
      newPassword: faker.internet.password(),
    });

    const userId = faker.string.uuid();

    EncrypionServiceMock.decrypt.mockReturnValue({
      userId,
      expiresAt: new Date(Date.now() + 1000), // Token valid
    });

    const userExists = UserMockFactory.createEntity({ userId });
    UserRepositoryMock.findById.mockResolvedValue(userExists);

    const attemptId = faker.string.uuid();
    const attemptExists = UserPasswordRecoverAttemptMockFactory.createEntity({
      userId,
      attemptId,
    });
    UserPasswordRecoverAttemptRepositoryMock.findByUserId.mockResolvedValue(attemptExists);

    const passwordHashed = faker.string.uuid();
    HashServiceMock.hash.mockResolvedValue(passwordHashed);

    // Act
    await sut.execute(request);

    // Assert
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(request.token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledWith(userId);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledTimes(1);
    expect(HashServiceMock.hash).toHaveBeenCalledWith(request.newPassword);
    expect(HashServiceMock.hash).toHaveBeenCalledTimes(1);
    expect(UserPasswordRecoverAttemptRepositoryMock.delete).toHaveBeenCalledWith(attemptId);
    expect(UserPasswordRecoverAttemptRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.update).toHaveBeenCalledWith(userId, {
      password: passwordHashed,
      passwordChangedAt: expect.any(Date),
    });
  });
});
