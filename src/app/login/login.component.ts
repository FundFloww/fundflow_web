import { Component } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { UsuarioDTO } from '../interfaces/loginDto';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private usuariosService: UsuariosService, private router: Router) { }

    userNotExist: boolean = false;

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
        console.log(userCorrectData);
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
