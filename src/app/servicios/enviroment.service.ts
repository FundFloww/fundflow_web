import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    get production(): boolean {
        // Lógica para obtener el valor de producción
        return false;
    }

    get accountName(): string {
        // Lógica para obtener el nombre de la cuenta
        return 'fundflow';
    }

    get containerName(): string {
        // Lógica para obtener el nombre del contenedor
        return 'ideas'; // o 'idea' según lo necesites
    }

    get key(): string {
        // Lógica para obtener la clave
        return this.getEnvironmentVars('BLOB_PASSWORD') as string;
    }

    private getEnvironmentVars(key: string): string {
        if (typeof process !== 'undefined' && process && process.env) {
            return process.env[key] as string;
        } else {
            return '';
        }
    }
}
