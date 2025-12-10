import { DomainError } from '../exceptions/DomainError';

export class Imagen {
  public readonly value: string; // URL of the image

  private constructor(value: string) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: string): Imagen {
    if (!this.isValid(value)) {
      throw new DomainError('La URL de la imagen no es válida.');
    }
    return new Imagen(value);
  }

  private static isValid(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {

      return url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
    }
  }

  public getValue(): string {
    return this.value;
  }
}
