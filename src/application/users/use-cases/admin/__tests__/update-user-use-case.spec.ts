import { faker } from '@faker-js/faker';
import { UpdateUserUseCase } from '../update-user-use-case';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { ProfileRepositoryMock } from '../../../../../test/profiles/profile-repository-mock';
import { HashServiceMock } from '../../../../../test/shared/services/hash-service-mock';
import { MailServiceMock } from '../../../../../test/shared/services/mail-service-mock';
import { UpdateUserRequestDTO } from '../../../../../infra/users/dtos/admin/update-user-request-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';

describe('UpdateUserUseCase', () => {
  let sut: UpdateUserUseCase;

  beforeEach(() => {
    sut = new UpdateUserUseCase(UserRepositoryMock, ProfileRepositoryMock, HashServiceMock, MailServiceMock);
    jest.clearAllMocks();
  });

  it('should throw not found exception if user does not exist', async () => {
    const userId = faker.string.uuid();
    const request = UpdateUserRequestDTO.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      profileId: faker.string.uuid(),
      active: true,
    });

    UserRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(userId, request)).rejects.toThrow(HttpException);

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(ProfileRepositoryMock.findById).not.toHaveBeenCalled();
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should throw unprocessable entity if new profile does not exist', async () => {
    const userId = faker.string.uuid();
    const user = UserMockFactory.createEntity();
    const newProfileId = faker.string.uuid();

    const request = UpdateUserRequestDTO.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      profileId: newProfileId,
      active: true,
    });

    UserRepositoryMock.findById.mockResolvedValueOnce(user);
    ProfileRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(userId, request)).rejects.toThrow(HttpException);

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(newProfileId);
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should generate password and send mail if activating user for the first time', async () => {
    const userId = faker.string.uuid();
    const user = UserMockFactory.createEntity({
      active: false,
      passwordChangedAt: null,
    });

    const request = UpdateUserRequestDTO.create({
      profileId: user.profile.profileId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      active: true,
    });

    const passwordHash = 'hashedPassword';

    UserRepositoryMock.findById.mockResolvedValueOnce(user);
    HashServiceMock.hash.mockResolvedValueOnce(passwordHash);
    UserRepositoryMock.update.mockResolvedValueOnce({ ...user, ...request, password: passwordHash });
    MailServiceMock.sendMail.mockResolvedValueOnce();

    const result = await sut.execute(userId, request);

    expect(HashServiceMock.hash).toHaveBeenCalledWith(expect.any(String));
    expect(MailServiceMock.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: user.email,
        subject: 'Your account has been created',
        template: 'welcome',
        data: expect.objectContaining({
          email: user.email,
          firstName: user.firstName,
          password: expect.any(String),
        }),
      }),
    );
    expect(UserRepositoryMock.update).toHaveBeenCalledWith(
      userId,
      expect.objectContaining({
        password: passwordHash,
        active: true,
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        userId: user.userId,
        email: user.email,
      }),
    );
  });
});
