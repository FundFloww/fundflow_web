import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Noticia } from '../../interfaces/noticia';

@Injectable({
	providedIn: 'root'
})
export class NoticiasService {

	constructor() { }

	urlBase = environment.baseUrl;

    async getNoticias(page: number, size: number, searchString: string) {
        try {
            let url = `${this.urlBase}/api/noticias?page=${page}&size=${size}`;
            if (searchString.trim() !== '') {
                url += `&search=${searchString}`;
            }
            
            const response = await fetch(url);
            const datos = await response.json();
            return (datos.status != 404) ? datos : null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

	async deleteNoticia(noticiaId: number) {
        try {
            const response = await fetch(`${this.urlBase}/api/noticias/eliminar/${noticiaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la noticia');
            }

        } catch (error) {
            console.error('Error al realizar la operación:', error);
        }
    }

	async getNoticiaPorId(id: number): Promise<Noticia> {
        try {
            const response = await fetch(`${this.urlBase}/api/noticias/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener la noticia');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

	async addNoticia(noticia: Noticia) {
        try {
            const response = await fetch(`${this.urlBase}/api/noticias/nueva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noticia),
            });
            if(!response.ok) {
                throw new Error(`Error al enviar la noticia a la base de datos. Código de estado: ${response.status}`);
            }
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async editNoticia(noticiaEditada: Noticia) {
        try {
            const response = await fetch(`${this.urlBase}/api/noticias/editar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noticiaEditada),
            });

            if (!response.ok) {
                throw new Error('Error al editar la noticia');
            }

            return false;
        } catch (error) {
            console.error('Error al realizar la operación:', error);
            return true;
        }
    }

}
