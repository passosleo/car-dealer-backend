import { IHashService } from '../../application/services/hash-service';

export class HashServiceCryptoJS implements IHashService {
  public async hash(data: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
