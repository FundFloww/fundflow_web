import { Injectable } from '@angular/core';
import { UsuarioRegistroDTO } from '../interfaces/usuario-registro-dto';
import { UsuarioDTO } from '../interfaces/loginDto';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor() { }

    urlBase = 'http://10.100.11.1:9000';

    async addUsuario(nuevoUsuario: UsuarioRegistroDTO) {
        try {
            const response = await fetch(`${this.urlBase}/api/registro/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
            });

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            return false;
        } catch (error) {
            console.error('Error al realizar la operación:', error);
            return true;
        }
    }


    async login(usuario: UsuarioDTO) {
        try {
            const response = await fetch(`${this.urlBase}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }


    async loggedIn() {
        let token = localStorage.getItem('token');
        if (token !== null) {
            return true;
        }

        return false;
    }



}
