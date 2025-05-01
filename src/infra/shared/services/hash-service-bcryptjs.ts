import { IHashService } from '../../../application/shared/services/hash-service';
import bcryptjs from 'bcryptjs';

export class HashServiceBcryptJS implements IHashService {
  public async hash(data: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(data, salt);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return bcryptjs.compare(data, encrypted);
  }
}
