import { IHashService } from '../../application/services/hash-service';
import bcrypt from 'bcrypt';

export class HashServiceBcrypt implements IHashService {
  private readonly saltRounds = 16;

  public async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
