import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../interfaces/loginDTO';

@Injectable({
    providedIn: 'root'
})
export class UsuariosServicioService {
    constructor() { }

    urlBase = 'http://10.100.11.1:9000';

    login(usuario: UsuarioDTO) {
        return new Promise((resolve, reject) => {
            fetch(`${this.urlBase}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            }).then(response => {
                if (!response.ok) {
                    reject(response);
                }

                resolve(response.json());
            }
            ).catch(error => {
                console.error(error);
                reject(error);
            });
        });
    }
}
