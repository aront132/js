import { DomainError } from '../exceptions/DomainError';

export class Dinero {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: number): Dinero {
    if (value === null || value === undefined || value < 0) {
      throw new DomainError('El valor del dinero no puede ser negativo.');
    }
    // In a real application, you would handle currency and use integers for cents.
    return new Dinero(value);
  }

  public getValue(): number {
    return this.value;
  }
}
