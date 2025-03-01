import { IHashService } from '../../../application/shared/services/hash-service';
import bcrypt from 'bcrypt';

export class HashServiceBcrypt implements IHashService {
  public async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
