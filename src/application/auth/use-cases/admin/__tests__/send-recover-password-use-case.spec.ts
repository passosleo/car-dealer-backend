import { faker } from '@faker-js/faker';
import { SendRecoverPasswordUseCase } from '../send-recover-password-use-case';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { UserPasswordRecoverAttemptRepositoryMock } from '../../../../../test/users/user-password-recover-attempt-repository-mock';
import { MailServiceMock } from '../../../../../test/shared/services/mail-service-mock';
import { EncrypionServiceMock } from '../../../../../test/shared/services/encryption-service-mock';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';
import { UserPasswordRecoverAttemptMockFactory } from '../../../../../test/users/user-password-recover-attempt-mock-factory';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';

describe('SendRecoverPasswordUseCase', () => {
  let sut: SendRecoverPasswordUseCase;

  beforeEach(() => {
    sut = new SendRecoverPasswordUseCase(
      UserRepositoryMock,
      UserPasswordRecoverAttemptRepositoryMock,
      MailServiceMock,
      EncrypionServiceMock,
    );
    jest.clearAllMocks();
  });

  it('should throw not found when user does not exist', async () => {
    // Arrange
    const email = faker.internet.email();
    UserRepositoryMock.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute({ email })).rejects.toThrow(HttpException);

    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(UserPasswordRecoverAttemptRepositoryMock.findByUserId).not.toHaveBeenCalled();
  });

  it('should create a new password recover attempt and send email if no attempt exists', async () => {
    // Arrange
    const user = UserMockFactory.createEntity();
    const token = faker.string.uuid();

    UserRepositoryMock.findByEmail.mockResolvedValue(user);
    UserPasswordRecoverAttemptRepositoryMock.findByUserId.mockResolvedValue(null);
    EncrypionServiceMock.encrypt.mockReturnValue(token);

    // Act
    await sut.execute({ email: user.email });

    // Assert
    expect(UserPasswordRecoverAttemptRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.sendMail).toHaveBeenCalledTimes(1);
  });

  it('should block user if already blocked and still within block window', async () => {
    // Arrange
    const user = UserMockFactory.createEntity();
    const blockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in future
    const attempt = UserPasswordRecoverAttemptMockFactory.createEntity({
      userId: user.userId,
      blockedUntil,
    });

    UserRepositoryMock.findByEmail.mockResolvedValue(user);
    UserPasswordRecoverAttemptRepositoryMock.findByUserId.mockResolvedValue(attempt);

    // Act & Assert
    await expect(sut.execute({ email: user.email })).rejects.toThrow(HttpException);

    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should reset attempt count and send email if block time expired', async () => {
    // Arrange
    const user = UserMockFactory.createEntity();
    const blockedUntil = new Date(Date.now() - 60 * 1000); // expired block
    const attempt = UserPasswordRecoverAttemptMockFactory.createEntity({
      userId: user.userId,
      blockedUntil,
    });
    const token = faker.string.uuid();

    UserRepositoryMock.findByEmail.mockResolvedValue(user);
    UserPasswordRecoverAttemptRepositoryMock.findByUserId.mockResolvedValue(attempt);
    EncrypionServiceMock.encrypt.mockReturnValue(token);

    // Act
    await sut.execute({ email: user.email });

    // Assert
    expect(UserPasswordRecoverAttemptRepositoryMock.update).toHaveBeenCalledWith(
      attempt.attemptId,
      expect.objectContaining({
        attemptCount: 1,
        blockedUntil: null,
      }),
    );
    expect(MailServiceMock.sendMail).toHaveBeenCalledTimes(1);
  });
});
