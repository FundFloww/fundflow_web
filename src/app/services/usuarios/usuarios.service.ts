import { Injectable } from '@angular/core';
import { UsuarioRegistroDTO } from '../../interfaces/usuario-registro-dto';
import { UsuarioDTO } from '../../interfaces/loginDto';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { UsuarioEditarDTO } from '../../interfaces/usuario-editarDto';
import { environment } from '../../../environments/environment';
import { UsuarioEditarContraseñaDTO } from '../../interfaces/usuario-editar-contraseñaDTO';
import { GuardarIdea } from '../../interfaces/GuardarIdea';
import { Usuario } from '../../interfaces/usuario';

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

    async deleteUsuario(userId: number) {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/eliminar/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

        } catch (error) {
            console.error('Error al realizar la operación:', error);
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

    async getUsuarioPorId(id: number): Promise<Usuario> {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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

    async guardarIdea(datos: GuardarIdea) {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/guardarIdea`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify(datos),
            });

            if (!response.ok) {
                throw new Error('Error al guardar la idea');
            }

            return false;
        } catch (error) {
            console.error('Error al realizar la operación:', error);
            return true;
        }
    }

    async eliminarIdeaGuardada(datos: GuardarIdea) {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/eliminarIdeaGuardada`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify(datos),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la idea guardada');
            }

            return false;
        } catch (error) {
            console.error('Error al realizar la operación:', error);
            return true;
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

    async getUsuariosZonaAdmin(page: number, size: number) {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/admin?page=${page}&size=${size}`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async recuperarContrasena(correo: String) {
        try {
            const response = await fetch(`${this.urlBase}/api/usuarios/recuperar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(correo),
            });
            
            if (!response.ok) {
                throw new Error('Error al recuperar la contraseña');
            }

            return true;
        } catch (error) {
            console.error('Error al realizar la operación:', error);
            return false;
        }
    }

}
