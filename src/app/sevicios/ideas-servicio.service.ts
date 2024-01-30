import { Injectable } from '@angular/core';
import { Idea } from '../interfaces/idea';

@Injectable({
    providedIn: 'root'
})
export class IdeasServicioService {
    private ideas: Idea[] = [
        {
            id: 1,
            titulo: 'Fund Flow',
            campo: 'IT',
            imagenes: [],
            descripcion: 'Idea de prueba 1'
        }, 
        {
            id: 2,
            titulo: 'Idea 2',
            campo: 'Salud',
            imagenes: [],
            descripcion: 'Idea de prueba 2'
        },
        {
            id: 3,
            titulo: 'Otra idea',
            campo: 'Otro',
            imagenes: [],
            descripcion: 'Una idea adicional para pruebas manuales y como quiero probar cosas con la longitud añada más texto superinteresante, para nada es relleno.'
        },
        {
            id: 4,
            titulo: 'Otra idea mas',
            campo: 'Otro',
            imagenes: [],
            descripcion: 'Una idea adicional para pruebas manuales y como quiero probar cosas con la longitud añada más texto superinteresante, para nada es relleno.'
        }
    ];

    getIdeas(): Idea[] {
        return this.ideas;
    }

    addIdea(idea: Idea) {
        this.ideas.push(idea);
    }
}
