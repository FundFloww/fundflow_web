import { Component } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Router } from '@angular/router';
import { UsuarioRegistroDTO } from "../interfaces/usuario-registro-dto";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-registro',
    standalone: true,
    imports: [FormsModule, CommonModule],
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
        this.router.navigate(['/login']);
    }

    async addNewUsuario() {
        if (!this.contrasenasCoinciden()) {
            this.showError = true;
            return;
        }

        this.userExists = await this.usuariosService.addUsuario(this.newUsuario);

        if (!this.userExists) {
            this.goBack();
        }
    }

    contrasenasCoinciden(): boolean {
        if (this.newUsuario.contrasena !== this.newUsuario.confirmarContrasena) {
            this.errorContrasena = 'Las contraseñas no coinciden';
            return false;
        } else {
            this.errorContrasena = '';
            return true;
        }
    }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
    }

}
