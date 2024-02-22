import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuarioDTO } from '../../interfaces/loginDto';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(
        private usuariosService: UsuariosService, 
        private router: Router,
        private route: ActivatedRoute
    ) { }

    userNotExist: boolean = false;
    registroExitoso: boolean = false;

    usuario: UsuarioDTO = {
        correo: '',
        contrasena: ''
    };

    async ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['registroExitoso']) {
                this.registroExitoso = true;
                setInterval(() => {
                    this.registroExitoso = false;
                }, 5000);
            }
        });

        if(await this.usuariosService.loggedIn())
        {
            this.router.navigate(['/home']);
        }
    }

    async onSubmit() {
        this.usuario.correo = this.usuario.correo.toLowerCase();
        const userCorrectData = await this.usuariosService.login(this.usuario);
        if(userCorrectData !== null)
        {
            localStorage.setItem('token', userCorrectData.token);
            this.router.navigate(['/home']);
        } else {
            this.userNotExist = true;
        }
    }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid && !this.userNotExist,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
    }
}
