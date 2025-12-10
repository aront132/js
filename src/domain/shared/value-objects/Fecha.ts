import { DomainError } from "../exceptions/DomainError";

export class Fecha {
    private readonly value: Date;

    private constructor(value: Date) {
        this.value = value;
        Object.freeze(this);
    }

    public static create(value: string | Date): Fecha {
        const date = value instanceof Date ? value : new Date(value);

        if (isNaN(date.getTime())) {
            throw new DomainError("La fecha proporcionada no es válida.");
        }
        return new Fecha(date);
    }

    public static now(): Fecha {
        return new Fecha(new Date());
    }

    public getValue(): Date {
        return this.value;
    }

    public toISOString(): string {
        return this.value.toISOString();
    }
}
