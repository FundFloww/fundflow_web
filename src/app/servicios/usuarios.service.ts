import { Injectable } from '@angular/core';
import { UsuarioRegistroDTO } from '../interfaces/usuario-registro-dto';
import { UsuarioDTO } from '../interfaces/loginDto';
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor() { }

    urlBase = 'http://localhost:9000';

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

    async getUsuario() {
        let token = localStorage.getItem('token');
        if (token === null) {
            return null;
        }

        let userId = jwtDecode(token).sub;

        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener usuario');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

}
