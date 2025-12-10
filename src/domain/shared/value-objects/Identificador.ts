import { DomainError } from '../exceptions/DomainError';

export class Identificador {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value?: string): Identificador {
 
    if (!value) {
      const newId = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
      return new Identificador(newId);
    }

    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new DomainError('El identificador no puede estar vacío.');
    }
    return new Identificador(value);
  }

  public getValue(): string {
    return this.value;
  }
}
