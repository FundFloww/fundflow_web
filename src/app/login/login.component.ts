import { Component } from '@angular/core';
import { UsuariosServicioService } from '../servicios/usuarios-servicio.service';
import { UsuarioDTO } from '../interfaces/loginDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private usuariosService: UsuariosServicioService) { }

    usuario!: UsuarioDTO;

    onSubmit() {
        this.usuariosService.login(this.usuario).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });
    }
}
