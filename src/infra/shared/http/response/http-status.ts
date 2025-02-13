export class HttpStatus {
  private constructor(
    public readonly code: number,
    public readonly phrase: string,
  ) {}

  public static readonly OK = new HttpStatus(200, 'OK');
  public static readonly CREATED = new HttpStatus(201, 'Created');
  public static readonly NO_CONTENT = new HttpStatus(204, 'No Content');
  public static readonly BAD_REQUEST = new HttpStatus(400, 'Bad Request');
  public static readonly UNAUTHORIZED = new HttpStatus(401, 'Unauthorized');
  public static readonly FORBIDDEN = new HttpStatus(403, 'Forbidden');
  public static readonly NOT_FOUND = new HttpStatus(404, 'Not Found');
  public static readonly CONFLICT = new HttpStatus(409, 'Conflict');
  public static readonly TOO_MANY_REQUESTS = new HttpStatus(429, 'Too Many Requests');
  public static readonly INTERNAL_SERVER_ERROR = new HttpStatus(500, 'Internal Server Error');
  public static readonly BAD_GATEWAY = new HttpStatus(502, 'Bad Gateway');
  public static readonly SERVICE_UNAVAILABLE = new HttpStatus(503, 'Service Unavailable');
  public static readonly GATEWAY_TIMEOUT = new HttpStatus(504, 'Gateway Timeout');

  public getReasonPhrase(): string {
    return this.phrase;
  }

  public getStatusCode(): number {
    return this.code;
  }

  public static fromCode(code: number): HttpStatus | undefined {
    return Object.values(HttpStatus).find((status) => status instanceof HttpStatus && status.code === code);
  }
}
