import { Component } from '@angular/core';
import { UsuariosServicioService } from '../servicios/usuarios-servicio.service';
import { UsuarioDTO } from '../interfaces/loginDto';
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

    usuario: UsuarioDTO = {
        correo: '',
        contrasena: ''
    };

    async ngOnInit() {
        const loggedIn = await this.usuariosService.loggedIn();
        if (loggedIn) {
            console.log('Usuario logueado');
            window.location.href = '/home';
        }

        console.log('Usuario no logueado');
    }

    async onSubmit() {
        const userCorrect = await this.usuariosService.login(this.usuario);
        if (userCorrect) {
            window.location.href = '/home';
        }
    }
}
