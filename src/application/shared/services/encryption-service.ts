export interface IEncryptionService {
  encrypt<T>(value: T): string;
  decrypt<T>(value: string): T;
}
