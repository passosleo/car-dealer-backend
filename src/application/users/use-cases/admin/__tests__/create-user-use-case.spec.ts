import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { CreateUserUseCase } from '../create-user-use-case';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { ProfileRepositoryMock } from '../../../../../test/profiles/profile-repository-mock';
import { HashServiceMock } from '../../../../../test/shared/services/hash-service-mock';
import { MailServiceMock } from '../../../../../test/shared/services/mail-service-mock';
import { CreateUserRequestDTO } from '../../../../../infra/users/dtos/admin/create-user-request-dto';
import { ProfileMockFactory } from '../../../../../test/profiles/profile-mock-factory';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';

describe('CreateUserUseCase', () => {
  let sut: CreateUserUseCase;

  beforeEach(() => {
    sut = new CreateUserUseCase(UserRepositoryMock, ProfileRepositoryMock, HashServiceMock, MailServiceMock);
    jest.clearAllMocks();
  });

  it('should throw a unprocessable entity exception when profile does not exist', async () => {
    // Arrange
    const request = CreateUserRequestDTO.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      profileId: faker.string.uuid(),
      active: true,
    });

    ProfileRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(request.profileId);
    expect(UserRepositoryMock.findByEmail).not.toHaveBeenCalled();
    expect(HashServiceMock.hash).not.toHaveBeenCalled();
    expect(UserRepositoryMock.create).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should throw a conflict exception when another user with same email exists', async () => {
    // Arrange
    const request = CreateUserRequestDTO.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      profileId: faker.string.uuid(),
      active: true,
    });
    const profile = ProfileMockFactory.createEntity({
      profileId: request.profileId,
    });
    const userExists = UserMockFactory.createEntity({
      email: request.email,
    });

    ProfileRepositoryMock.findById.mockResolvedValueOnce(profile);
    UserRepositoryMock.findByEmail.mockResolvedValueOnce(userExists);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(request.profileId);
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
    expect(HashServiceMock.hash).not.toHaveBeenCalled();
    expect(UserRepositoryMock.create).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should create a new user successfully', async () => {
    // Arrange
    const request = CreateUserRequestDTO.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      profileId: faker.string.uuid(),
      active: false,
    });
    const profile = ProfileMockFactory.createEntity({
      profileId: request.profileId,
    });
    const passwordHash = 'hashedPassword';
    const createdUser = UserMockFactory.createEntity({
      ...request,
      password: passwordHash,
      profile,
    });

    ProfileRepositoryMock.findById.mockResolvedValueOnce(profile);
    UserRepositoryMock.findByEmail.mockResolvedValueOnce(null);
    HashServiceMock.hash.mockResolvedValueOnce(passwordHash);
    UserRepositoryMock.create.mockResolvedValueOnce(createdUser);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(result).toEqual(
      expect.objectContaining({
        userId: createdUser.userId,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        profile,
        active: createdUser.active,
      }),
    );
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(request.profileId);
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
    expect(HashServiceMock.hash).toHaveBeenCalledTimes(1);
    expect(HashServiceMock.hash).toHaveBeenCalledWith(expect.any(String));
    expect(UserRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        password: passwordHash,
        profile,
        active: request.active,
      }),
    );
  });

  it('should send a welcome email when user is active', async () => {
    // Arrange
    const request = CreateUserRequestDTO.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      profileId: faker.string.uuid(),
      active: true,
    });
    const profile = ProfileMockFactory.createEntity({
      profileId: request.profileId,
    });
    const passwordHash = 'hashedPassword';
    const createdUser = UserMockFactory.createEntity({
      ...request,
      password: passwordHash,
      profile,
    });

    ProfileRepositoryMock.findById.mockResolvedValueOnce(profile);
    UserRepositoryMock.findByEmail.mockResolvedValueOnce(null);
    HashServiceMock.hash.mockResolvedValueOnce(passwordHash);
    UserRepositoryMock.create.mockResolvedValueOnce(createdUser);

    // Act
    await sut.execute(request);

    // Assert
    expect(MailServiceMock.sendMail).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.sendMail).toHaveBeenCalledWith({
      to: createdUser.email,
      subject: 'Your account has been created',
      template: 'welcome',
      data: {
        firstName: createdUser.firstName,
        email: createdUser.email,
        password: expect.any(String),
      },
    });
  });
});
