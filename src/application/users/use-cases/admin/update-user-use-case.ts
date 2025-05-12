import { IProfileRepository } from '../../../../domain/profiles/repositories/profile-repository';
import { User } from '../../../../domain/users/entities/user-entity';
import { IUserRepository } from '../../../../domain/users/repositories/user-repository';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { UpdateUserRequestDTO } from '../../../../infra/users/dtos/admin/update-user-request-dto';
import { UserResponseDTO } from '../../../../infra/users/dtos/admin/user-response-dto';
import { IHashService } from '../../../shared/services/hash-service';
import { IMailService } from '../../../shared/services/mail-service';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly profileRepository: IProfileRepository,
    private readonly hashService: IHashService,
    private readonly mailService: IMailService,
  ) {}

  public async execute(userId: string, { profileId, ...data }: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }

    const updateUserData: Partial<User> = {
      ...data,
    };

    const hasNewProfile = profileId !== userExists.profile.profileId;

    if (hasNewProfile) {
      const profile = await this.profileRepository.findById(profileId);
      if (!profile) {
        throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The profile does not exist');
      }
      updateUserData.profile = profile;
    }

    const shouldAutoUpdatePassword = !userExists.active && !userExists.passwordChangedAt && data.active;
    let sendPasswordMailPromise: Promise<void> = Promise.resolve();

    if (shouldAutoUpdatePassword) {
      const defaultPassword = StringHelper.generateStrongPassword();
      const passwordHash = await this.hashService.hash(defaultPassword);
      updateUserData.password = passwordHash;

      sendPasswordMailPromise = this.mailService.sendMail({
        to: userExists.email,
        subject: 'Your account has been created',
        template: 'welcome',
        data: {
          firstName: userExists.firstName,
          email: userExists.email,
          password: defaultPassword,
        },
      });
    }

    const [user] = await Promise.all([this.userRepository.update(userId, updateUserData), sendPasswordMailPromise]);

    return UserResponseDTO.create(user);
  }
}
