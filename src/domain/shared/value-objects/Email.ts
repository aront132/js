import { DomainError } from "../exceptions/DomainError";

export class Email {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
        Object.freeze(this); // Asegura inmutabilidad
    }

    public static create(value: string): Email {
        if (!this.isValid(value)) {
            throw new DomainError("El formato del email es inválido.");
        }
        return new Email(value);
    }

    private static isValid(value: string): boolean {
        if (!value) return false;
        // Expresión regular simple para validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    public getValue(): string {
        return this.value;
    }
}
