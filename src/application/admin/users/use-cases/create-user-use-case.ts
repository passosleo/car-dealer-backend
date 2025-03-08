import { IProfileRepository } from '../../../../domain/admin/profiles/repositories/profile-repository';
import { User } from '../../../../domain/admin/users/entities/user-entity';
import { IUserRepository } from '../../../../domain/admin/users/repositories/user-repository';
import { CreateUserRequestDTO } from '../../../../infra/admin/users/http/dtos/create-user-request-dto';
import { UserResponseDTO } from '../../../../infra/admin/users/http/dtos/user-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IHashService } from '../../../shared/services/hash-service';
import { IMailService } from '../../../shared/services/mail-service';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly profileRepository: IProfileRepository,
    private readonly hashService: IHashService,
    private readonly mailService: IMailService,
  ) {}

  public async execute(data: CreateUserRequestDTO): Promise<UserResponseDTO> {
    const profile = await this.profileRepository.findById(data.profileId);

    if (!profile) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The profile does not exist');
    }

    const userWithSameEmailExists = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmailExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'A user with the same email already exists');
    }

    const defaultPassword = StringHelper.generateStrongPassword();
    const passwordHash = await this.hashService.hash(defaultPassword);

    const newUser = User.create({
      ...data,
      password: passwordHash,
      profile,
    });

    const user = await this.userRepository.create(newUser);

    if (user.active) {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Your account has been created',
        template: 'welcome',
        data: {
          firstName: user.firstName,
          email: user.email,
          password: defaultPassword,
        },
      });
    }

    return UserResponseDTO.create(user);
  }
}
