import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { UsuarioRegistroDTO } from "../../interfaces/usuario-registro-dto";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [
        FormsModule, 
        CommonModule,
        RouterModule
    ],
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
        confirmarContrasena: '',
        tipo: 'EMPRENDEDOR'
    };

    errorContrasena: string = '';
    showError: boolean = false;
    userExists: boolean = false;

    goBack() {
        this.router.navigate(['/login'], { queryParams: { registroExitoso: true } });
    }

    async addNewUsuario() {

        this.userExists = await this.usuariosService.addUsuario(this.newUsuario);
        
        if (!this.userExists) {
            this.goBack();
        }
    }

    contrasenasCoinciden(): boolean {
        return this.newUsuario.contrasena === this.newUsuario.confirmarContrasena;
    }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid && !this.userExists,
            [errorClass]: ngModel.touched && (ngModel.invalid || (ngModel.name === 'email' && this.userExists))
        };
    }

    validPassword(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: this.contrasenasCoinciden() && ngModel.touched && !this.userExists,
            [errorClass]: (!this.contrasenasCoinciden() || ngModel.errors?.['required']) && ngModel.touched
        };
    }
    

}
