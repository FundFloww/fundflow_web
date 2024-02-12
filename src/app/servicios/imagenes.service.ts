import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ImagenesService {

    constructor() { }

    urlBase = environment.baseUrl;

    async subirImagenes(imagenes: File[]) {
        const urls: string[] = [];

        const promesas = imagenes.map(async (imagen) => {
            const formData = new FormData();
            formData.append('imagen', imagen);

            const response = await fetch(`${this.urlBase}/api/blob/upload`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const responseData = await response.text();
                urls.push(responseData);
            }
        });

        await Promise.all(promesas);

        return urls;
    }
}
