import CryptoJS from 'crypto-js';
import { IEncryptionService } from '../../../application/shared/services/encryption-service';
import { HttpException } from '../http/response/http-exception';
import { HttpStatus } from '../http/response/http-status';
import { CONFIG } from '../constants/config';

export class EncryptionServiceCryptoJS implements IEncryptionService {
  private readonly secret: string;

  constructor(secret?: string) {
    this.secret = secret || CONFIG.encryption.secret;
  }

  encrypt<T>(value: T) {
    return CryptoJS.AES.encrypt(JSON.stringify(value), this.secret).toString();
  }

  decrypt<T>(value: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(value, this.secret);
      const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decoded as T;
    } catch (error) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }
}
