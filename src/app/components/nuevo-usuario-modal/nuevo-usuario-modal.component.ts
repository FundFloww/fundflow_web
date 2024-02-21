import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuarioRegistroDTO } from '../../interfaces/usuario-registro-dto';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'nuevo-usuario-modal',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './nuevo-usuario-modal.component.html',
	styleUrl: './nuevo-usuario-modal.component.scss'
})
export class NuevoUsuarioModalComponent {
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

	@Output() usuarioAgregado = new EventEmitter<boolean>();

	constructor(private usuariosService: UsuariosService) { }

	@ViewChild('registroForm') registroForm!: NgForm;

	async addNewUsuario(evento: Event) {
		const boton = evento.target as HTMLElement;

		this.newUsuario.correo = this.newUsuario.correo.toLowerCase();

		this.usuariosService.addUsuario(this.newUsuario).then(response => {
			this.userExists = response;

			if (!response) {
				this.usuarioAgregado.emit(!this.userExists);
				boton.setAttribute("data-bs-toggle", "modal");
                boton.click();
			}
		});
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

	resetForm() {
        if (this.registroForm) {
            this.newUsuario.tipo = 'EMPRENDEDOR';
            this.userExists = false;
            this.registroForm.resetForm();
        }
    }
}
