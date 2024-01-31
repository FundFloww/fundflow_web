import { Component } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Router } from '@angular/router';
import { UsuarioRegistroDTO } from "../interfaces/usuario-registro-dto";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  constructor(
    private usuariosService: UsuariosService,
    private router: Router) { }

  newUsuario: UsuarioRegistroDTO = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    tipoUsuario: ''
  };

  goBack() {
    this.router.navigate(['/inicio']);
  }

  addNewUsuario() {
    this.usuariosService.addUsuario(this.newUsuario);
  }
}
