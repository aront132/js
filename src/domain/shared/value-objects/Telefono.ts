import { DomainError } from '../exceptions/DomainError';

export class Telefono {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: string): Telefono {
    if (!/^\+?[0-9\s-]{7,15}$/.test(value)) {
      throw new DomainError('El número de teléfono no es válido.');
    }
    return new Telefono(value);
  }

  public getValue(): string {
    return this.value;
  }
}
