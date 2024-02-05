import { Injectable } from '@angular/core';
import { Idea } from '../interfaces/idea';
import { Usuario } from '../interfaces/usuario';
import { IdeaDto } from '../interfaces/ideaDto';

@Injectable({
    providedIn: 'root'
})
export class IdeasServicioService {
    private ideas: Idea[] = [];
    private apiURL = "http://localhost:9000";

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
    
    async getIdeasEmprendedor(emprendedor: Usuario): Promise<Idea[]> {
        try {
            const response = await fetch(`${this.apiURL}/api/ideas`);
            const datos: Idea[] = await response.json();
            
            const ideasFiltradas = datos.filter(idea => {
                return idea.emprendedor.includes(emprendedor);
            });
    
            return ideasFiltradas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    // getIdeas(): Promise<Idea[]> {
    //     return new Promise((resolve, reject) => {
    //         fetch("http://10.100.11.1:9000/api/ideas/dto")
    //             .then(response => response.json())
    //             .then(datos => {
    //                 resolve(datos);
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 reject(error);
    //             });
    //     });
    // }

    // getIdeasEmprendedor(emprendedor: Usuario): Promise<Idea[]> {
    //     return new Promise((resolve, reject) => {
    //         fetch("http://10.100.11.1:9000/api/ideas")
    //             .then(response => response.json())
    //             .then((datos: Idea[]) => {
    //                 const ideasFiltradas = datos.filter(idea => {
    //                     return idea.emprendedor.includes(emprendedor);
    //                 });
    //                 resolve(ideasFiltradas);
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 reject(error);
    //             });
    //     });
    // }

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
