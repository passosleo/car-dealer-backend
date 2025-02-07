export interface RequestSchema<T = any> {
  body?: { [K in keyof Partial<T>]: Schema<T[K]> };
  query?: { [K in keyof Partial<T>]: Schema<T[K]> };
  params?: { [K in keyof Partial<T>]: Schema<T[K]> };
}
