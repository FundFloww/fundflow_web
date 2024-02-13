import { Injectable } from '@angular/core';
import { Idea } from '../interfaces/idea';
import { Usuario } from '../interfaces/usuario';
import { IdeaDto } from '../interfaces/ideaDto';
import { UsuariosService } from './usuarios.service';
import { IdeaNueva } from '../interfaces/ideaNueva';
import { Campos } from '../enum/campos';
import { CamposApi } from '../enum/camposApi';
import { environment } from '../../environments/environment';

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

    async getIdeasUser(id: number): Promise<IdeaDto[]> {
        // const userId = this.usuariosService.getUserId();
        const userId = id;

        try {
            const response = await fetch(`${this.apiURL}/api/ideas/usuario/${userId}`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getIdeasInvertidas(id: number): Promise<IdeaDto[]> {
        // const userId = this.usuariosService.getUserId();
        const userId = id;

        try{
            const response = await fetch(`${this.apiURL}/api/ideas/inversor/${userId}`);
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

    async getIdeasGuardadas(id: number): Promise<IdeaDto[]> {
        const userId = id;
        let usuario = await this.usuariosService.getUsuario(id);

        let ideasGuardadas: IdeaDto[] = [];
        for (const idea of usuario.guardados)
        {
            try {
                const response = await fetch(`${this.apiURL}/api/ideas/dto/${idea.id}`);
                const datos = await response.json();
                ideasGuardadas.push(datos);
            } catch (error) {
                console.error(error);
                throw error;
            }
        };
        return ideasGuardadas;
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
}
