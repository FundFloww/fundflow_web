import { Injectable } from '@angular/core';
import { UsuarioRegistroDTO } from '../interfaces/usuario-registro-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  addUsuario(nuevoUsuario: UsuarioRegistroDTO) {
    fetch("http://10.100.11.1:9000/api/registro/nuevo")
  }
}
