import { Identificador } from './Identificador';

export class PedidoID {
    public readonly value: Identificador;

    private constructor(value: Identificador) {
        this.value = value;
        Object.freeze(this);
    }

    public static create(idValue?: string): PedidoID {
        return new PedidoID(Identificador.create(idValue));
    }

    public getValue(): string {
        return this.value.getValue();
    }
}
