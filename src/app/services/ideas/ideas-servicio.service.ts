import { Injectable } from '@angular/core';
import { Idea } from '../../interfaces/idea';
import { Usuario } from '../../interfaces/usuario';
import { IdeaDto } from '../../interfaces/ideaDto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { IdeaNueva } from '../../interfaces/ideaNueva';
import { Campos } from '../../enum/campos';
import { CamposApi } from '../../enum/camposApi';
import { environment } from '../../../environments/environment';
import { InversionEnviar } from '../../interfaces/InversionEnviar';
import { Hito } from '../../interfaces/hito';
import { IdeaItemAdminComponent } from '../../components/idea-item-admin/idea-item-admin.component';
import { IdeaEditarDto } from '../../interfaces/ideaEditarDto';

@Injectable({
    providedIn: 'root'
})
export class IdeasServicioService {

    constructor(
        private usuariosService: UsuariosService
    ) { }

    private apiURL = environment.baseUrl;

    async getIdeas(): Promise<IdeaDto[]> {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/dto`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getIdeasAll(): Promise<Idea[]> {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getIdeasUser(id: number): Promise<IdeaDto[]> {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/usuario/${id}`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getIdeasInvertidas(id: number): Promise<IdeaDto[]> {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/invertidas/${id}`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addIdea(idea: IdeaNueva) {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/nueva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(idea),
            });
            if(!response.ok) {
                throw new Error(`Error al enviar la idea a la base de datos. Código de estado: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async editIdea(idea: IdeaEditarDto) {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/editar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(idea),
            });
            if(!response.ok) {
                throw new Error(`Error al enviar la idea a la base de datos. Código de estado: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
            
        }
    }

    async deleteIdea(ideaId: number) {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/eliminar/${ideaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la idea.');
            }

        } catch (error) {
            console.error('Error al realizar la operación:', error);
        }
    }

    async getIdeasGuardadas(id: number): Promise<IdeaDto[]> {
        const response = await fetch(`${this.apiURL}/api/usuarios/guardadas/${id}`);
        const datos = await response.json();
        return datos;
    }

    async getIdeasFiltradas(campos: CamposApi[]): Promise<IdeaDto[]> {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/filtradas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campos),
            });
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async invertir(inversion: InversionEnviar) {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/invertir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(inversion),
            });
            if(!response.ok) {
                throw new Error(`Error al enviar la inversión a la base de datos. Código de estado: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async guardarHito(idIdea: number, hito: Hito) {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/${idIdea}/hitos/nuevo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hito),
            });
            if(!response.ok) {
                throw new Error(`Error al enviar el hito a la base de datos. Código de estado: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async eliminarHito(idIdea: number, hito: Hito) {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/${idIdea}/hitos/eliminar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hito),
            });
            if(!response.ok) {
                throw new Error(`Error al eliminar el hito de la base de datos. Código de estado: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getIdeasAdmin(page: number, size: number, searchString: string, campo: string) {
        try {
            let url = `${this.apiURL}/api/ideas/admin?page=${page}&size=${size}`;
            if (searchString !== '') {
                url += `&search=${searchString}`;
            }

            if(campo !== 'TODOS') {
                url += `&campo=${campo}`;
            }

            const response = await fetch(url);
            const datos = await response.json();
            return (datos.status != 404) ? datos : null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getIdeaPorId(id: number) {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener la idea');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}
