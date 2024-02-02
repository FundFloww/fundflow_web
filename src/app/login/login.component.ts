import { Component } from '@angular/core';
import { UsuariosServicioService } from '../servicios/usuarios-servicio.service';
import { UsuarioDTO } from '../interfaces/loginDto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private usuariosService: UsuariosServicioService, private router: Router) { }

    usuario: UsuarioDTO = {
        correo: '',
        contrasena: ''
    };

    async ngOnInit() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this.router.navigate(['/home']);
        }
    }

    async onSubmit() {
        const userCorrectData = await this.usuariosService.login(this.usuario);
        if(userCorrectData.token !== null)
        {
            localStorage.setItem('token', userCorrectData.token);
            this.router.navigate(['/home']);
        }
    }
}
