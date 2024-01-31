import { Injectable } from '@angular/core';
import { Idea } from '../interfaces/idea';
import { Usuario } from '../interfaces/usuario';

@Injectable({
    providedIn: 'root'
})
export class IdeasServicioService {
    private ideas: Idea[] = [
    //     {
    //         id: 1,
    //         titulo: 'Fund Flow',
    //         campo: 'IT',
    //         imagenes: [],
    //         descripcion: 'Idea de prueba 1'
    //     }, 
    //     {
    //         id: 2,
    //         titulo: 'Idea 2',
    //         campo: 'Salud',
    //         imagenes: [],
    //         descripcion: 'Idea de prueba 2'
    //     },
    //     {
    //         id: 3,
    //         titulo: 'Otra idea',
    //         campo: 'Otro',
    //         imagenes: [],
    //         descripcion: 'Una idea adicional para pruebas manuales y como quiero probar cosas con la longitud añada más texto superinteresante, para nada es relleno.'
    //     },
    //     {
    //         id: 4,
    //         titulo: 'Otra idea mas',
    //         campo: 'Otro',
    //         imagenes: [],
    //         descripcion: 'Una idea adicional para pruebas manuales y como quiero probar cosas con la longitud añada más texto superinteresante, para nada es relleno.'
    //     }
    ];

    getIdeas(): Promise<Idea[]> {
        return new Promise((resolve, reject) => {
            fetch("http://10.100.11.1:9000/api/ideas/dto")
                .then(response => response.json())
                .then(datos => {
                    resolve(datos);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    getIdeasEmprendedor(emprendedor: Usuario): Promise<Idea[]> {
        return new Promise((resolve, reject) => {
            fetch("http://10.100.11.1:9000/api/ideas")
                .then(response => response.json())
                .then((datos: Idea[]) => {
                    const ideasFiltradas = datos.filter(idea => {
                        return idea.emprendedor.includes(emprendedor);
                    });
                    resolve(ideasFiltradas);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    addIdea(idea: Idea) {
        this.ideas.push(idea);
    }
}
