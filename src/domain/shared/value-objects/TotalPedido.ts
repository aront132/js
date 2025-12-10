import { DomainError } from '../exceptions/DomainError';

export class TotalPedido {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: number): TotalPedido {
    if (value === null || value === undefined || value < 0) {
      throw new DomainError('El total del pedido no puede ser negativo.');
    }
    return new TotalPedido(value);
  }

  public getValue(): number {
    return this.value;
  }
}
