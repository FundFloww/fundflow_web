import { Injectable } from '@angular/core';
import { Idea } from '../interfaces/idea';
import { Usuario } from '../interfaces/usuario';
import { IdeaDto } from '../interfaces/ideaDto';
import { UsuariosService } from './usuarios.service';

@Injectable({
    providedIn: 'root'
})
export class IdeasServicioService {

    constructor(
        private usuariosService: UsuariosService
    ) { }

    private ideas: Idea[] = [];
    private apiURL = "http://10.100.11.1:9000";

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

    async getIdeasUser(): Promise<IdeaDto[]> {
        const userId = this.usuariosService.getUserId();

        try {
            const response = await fetch(`${this.apiURL}/api/ideas/usuario/${userId}`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addIdea(idea: Idea) {
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
            this.ideas.push(idea);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
