import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../interfaces/loginDto';

@Injectable({
    providedIn: 'root'
})
export class UsuariosServicioService {
    constructor() { }

    urlBase = 'http://localhost:9000';

    async login(usuario: UsuarioDTO) {
        try {
            const response = await fetch(`${this.urlBase}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
    
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
    
            return true;
        } catch (error) {
            throw error;
        }
    }
    

    async loggedIn() {
        try {
            const response = await fetch(`${this.urlBase}/api/session/getSession`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                return false;
            }
    
            const text = await response.text();

            return text.trim() !== 'Username: null';
        } catch (error) {
            console.error('Error al realizar la solicitud HTTP:', error);
            return false;
        }
    }
    
    
    
}
