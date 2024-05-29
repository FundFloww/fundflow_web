import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Ollama } from 'ollama/dist/browser';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  constructor() { }

  private llamaUrl = environment.llamaUrl;

  async getODS(descripcion: string) {
    try{
      const response = await fetch(`${this.llamaUrl}/api/generate`,{
        method: 'POST',
        body: JSON.stringify({
          "model": "nebriolad/ods-model",
          "prompt": `${descripcion}`,
          "stream": false
        }),
      });
      const datos = await response.json();
      return datos.response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
