import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor() { }

  urlBase = environment.baseUrl;

  async enviarCorreo(correoDestinatario: string, asunto: string, contenido: string) {
    try {
      const body = new URLSearchParams();
      body.append('destinatario', correoDestinatario);
      body.append('asunto', asunto);
      body.append('contenido', contenido);

      const response = await fetch(`${this.urlBase}/api/correo/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el correo. Código de estado: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
