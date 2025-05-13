import { faker } from '@faker-js/faker';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ValidateRecoverPasswordRequestUseCase } from '../validate-recover-password-request-use-case';
import { UserPasswordRecoverAttemptRepositoryMock } from '../../../../../test/users/user-password-recover-attempt-repository-mock';
import { EncrypionServiceMock } from '../../../../../test/shared/services/encryption-service-mock';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';
import { UserPasswordRecoverAttemptMockFactory } from '../../../../../test/users/user-password-recover-attempt-mock-factory';

describe('ValidateRecoverPasswordRequestUseCase', () => {
  let sut: ValidateRecoverPasswordRequestUseCase;

  beforeEach(() => {
    sut = new ValidateRecoverPasswordRequestUseCase(
      UserRepositoryMock,
      UserPasswordRecoverAttemptRepositoryMock,
      EncrypionServiceMock,
    );
    jest.clearAllMocks();
  });

  it('should throw a unauthorized exception when token is expired', async () => {
    // Arrange
    const token = faker.string.uuid();
    const expiredTokenPayload = {
      userId: faker.string.uuid(),
      expiresAt: new Date(Date.now() - 1000), // expired token
    };

    EncrypionServiceMock.decrypt.mockReturnValue(expiredTokenPayload);

    // Act & Assert
    await expect(sut.execute(token)).rejects.toThrow(HttpException);

    // Assert
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).not.toHaveBeenCalled();
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).not.toHaveBeenCalled();
  });

  it('should throw a not found exception when user does not exists', async () => {
    // Arrange
    const token = faker.string.uuid();
    const validTokenPayload = {
      userId: faker.string.uuid(),
      expiresAt: new Date(Date.now() + 1000), // valid token
    };

    EncrypionServiceMock.decrypt.mockReturnValue(validTokenPayload);
    UserRepositoryMock.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(token)).rejects.toThrow(HttpException);

    // Assert
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(validTokenPayload.userId);
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).not.toHaveBeenCalled();
  });

  it('should throw a unauthorized exception when user recover password attempt does not exists', async () => {
    // Arrange
    const token = faker.string.uuid();
    const validTokenPayload = {
      userId: faker.string.uuid(),
      expiresAt: new Date(Date.now() + 1000), // valid token
    };
    const user = UserMockFactory.createEntity({ userId: validTokenPayload.userId });

    EncrypionServiceMock.decrypt.mockReturnValue(validTokenPayload);
    UserRepositoryMock.findById.mockResolvedValue(user);
    UserPasswordRecoverAttemptRepositoryMock.findByUserId.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(token)).rejects.toThrow(HttpException);

    // Assert
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(validTokenPayload.userId);
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledWith(validTokenPayload.userId);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledTimes(1);
  });

  it('should validate the token successfully', async () => {
    // Arrange
    const token = faker.string.uuid();
    const validTokenPayload = {
      userId: faker.string.uuid(),
      expiresAt: new Date(Date.now() + 1000), // valid token
    };
    const user = UserMockFactory.createEntity({ userId: validTokenPayload.userId });
    const userPasswordRecoverAttempt = UserPasswordRecoverAttemptMockFactory.createEntity({
      userId: validTokenPayload.userId,
    });

    EncrypionServiceMock.decrypt.mockReturnValue(validTokenPayload);
    UserRepositoryMock.findById.mockResolvedValue(user);
    UserPasswordRecoverAttemptRepositoryMock.findByUserId.mockResolvedValue(userPasswordRecoverAttempt);

    // Act
    const result = await sut.execute(token);

    // Assert
    expect(result).toBeUndefined();
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledWith(token);
    expect(EncrypionServiceMock.decrypt).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(validTokenPayload.userId);
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledWith(validTokenPayload.userId);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).toHaveBeenCalledTimes(1);
  });
});
