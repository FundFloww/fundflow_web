import { Injectable } from '@angular/core';
import { UsuarioRegistroDTO } from '../../interfaces/usuario-registro-dto';
import { UsuarioDTO } from '../../interfaces/loginDto';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { UsuarioEditarDTO } from '../../interfaces/usuario-editarDto';
import { environment } from '../../../environments/environment';
import { UsuarioEditarContraseñaDTO } from '../../interfaces/usuario-editar-contraseñaDTO';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(private router: Router) { }

    urlBase = environment.baseUrl;

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

    async editUsuario(usuarioEditado: UsuarioEditarDTO) {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/editar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioEditado),
            });

            if (!response.ok) {
                throw new Error('Error al editar el usuario');
            }

            return false;
        } catch (error) {
            console.error('Error al realizar la operación:', error);
            return true;
        }
    }

    async editContrasena(editarContraseña: UsuarioEditarContraseñaDTO) {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/editar/contrasena`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editarContraseña),
            });

            if (!response.ok) {
                throw new Error('Error al cambiar la contraseña');
            }

            return false;
        } catch (error) {
            console.error('Error al realizar la operación: ', error)
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
            console.error('Error al realizar la operación:', error);
            return null;
        }
    }

    async loggedIn() {
        let token = localStorage.getItem('token');
        if (token !== null) {
            return true;
        }

        return false;
    }

    async initializeSession() {
        let session = await this.loggedIn();
        if(!session) {
            this.router.navigate(['/inicio']);    
        }

        return session;
    }

    async getUsuario() {
        let userId = this.getUserId();

        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
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

    async getUsuarioPorId(id: number) {

        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/${id}`, {
                method: 'GET',
                // headers: {
                //     'Authorization': `Bearer ${this.getToken()}`
                // }
            });

            if (!response.ok) {
                throw new Error('Error al obtener usuario');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    getToken() {
        let token = localStorage.getItem('token');
        if (token === null) {
            return null;
        }

        return token;
    }

    getUserId() {
        let token = this.getToken();
        if (token === null) {
            return null;
        }

        return jwtDecode(token).sub;
    }

}
