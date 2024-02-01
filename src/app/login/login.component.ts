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
        const token = localStorage.getItem('token');
        if (token !== null) {
            console.log('Usuario logueado');
            window.location.href = '/home';
        }
    }

    async onSubmit() {
        const userCorrectData = await this.usuariosService.login(this.usuario);
        if(userCorrectData.token !== null)
        {
            localStorage.setItem('token', userCorrectData.token);
            window.location.href = '/home';
        }
    }
}
