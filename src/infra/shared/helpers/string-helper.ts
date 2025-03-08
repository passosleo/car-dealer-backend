export class StringHelper {
  public static isBase64Image(base64: string): boolean {
    const regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,[A-Za-z0-9+/]+={0,2}$/;
    return regex.test(base64);
  }
}
