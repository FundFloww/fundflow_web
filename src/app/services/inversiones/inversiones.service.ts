import { Injectable } from '@angular/core';
import { Inversion } from '../../interfaces/inversion';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InversionesService {

    constructor() { }

    private apiURL = environment.baseUrl;

    async getInversionesUsuario(id: number): Promise<Inversion[]> {
        try {
            const response = await fetch(`${this.apiURL}/api/inversiones/${id}`);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
