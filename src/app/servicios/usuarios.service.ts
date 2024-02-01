import { Injectable } from '@angular/core';
import { UsuarioRegistroDTO } from '../interfaces/usuario-registro-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  async addUsuario(nuevoUsuario: UsuarioRegistroDTO) {
    try {
      const response = await fetch("http://10.100.11.1:9000/api/registro/nuevo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      return false;
    } catch (error) {
      console.error('Error al realizar la operación:', error);
      return true;
    }
  }



}
