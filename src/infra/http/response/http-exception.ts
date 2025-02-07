import { HttpStatus } from './http-status';

export class HttpException extends Error {
  constructor(
    public readonly statusCode: HttpStatus,
    public readonly message: string,
  ) {
    super(message);
  }
}
