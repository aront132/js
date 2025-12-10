import { DomainError } from "../exceptions/DomainError";

export class Password {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
        Object.freeze(this);
    }

    public static create(value: string): Password {
        if (value.length < 8) {
            throw new DomainError("La contraseña debe tener al menos 8 caracteres.");
        }

        return new Password(value);
    }

    public getValue(): string {
       
        return this.value;
    }

    public compare(password: string): boolean {
    
        return this.value === password;
    }
}
