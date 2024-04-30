import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuarioEditarContraseñaDTO } from '../../interfaces/usuario-editar-contraseñaDTO';
import { UsuarioEditarDTO } from '../../interfaces/usuario-editarDto';
import { Usuario } from '../../interfaces/usuario';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'modificar-usuario-modal',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule
    ],
    templateUrl: './modificar-usuario-modal.component.html',
    styleUrl: './modificar-usuario-modal.component.scss'
})
export class ModificarUsuarioModalComponent {

    @Input() usuario!: Usuario | null;
    @Output() usuarioModificado = new EventEmitter<boolean>();

    usuarioTemporal: UsuarioEditarDTO = {
        nombre: '',
        apellidos: '',
        profesion: '',
        correo: '',
        descripcion: '',
        imagen: '',
        banner: '',
        // contrasena: '',
        // confirmarContrasena: '',
        tipo: '',
    };

    usuarioEditarContrasena: UsuarioEditarContraseñaDTO = {
        correo: '',
        nuevaContrasena: '',
        confirmarContrasena: '',
    };


    errorContrasena: string = '';
    showError: boolean = false;
    userExists: boolean = false;
    cambio: boolean = false;
    pswCambiada: boolean = false;

    @ViewChild('editForm') editForm!: NgForm;
    @ViewChild('editPasswordForm') editPasswordForm!: NgForm;

    constructor(
        private usuariosService: UsuariosService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['usuario'] && this.usuario) {
            this.usuarioTemporal = Object.assign({}, this.usuario);
        }
    }

    actualizarTipoUsuario() {
        this.usuarioTemporal.tipo = (this.usuarioTemporal.tipo == "EMPRENDEDOR") ? "INVERSOR" : "EMPRENDEDOR";
        this.cambioRealizado();
    }

    async editUsuario(){
        this.usuarioTemporal.correo = this.usuarioTemporal.correo.toLowerCase();

        if (Array.isArray(this.usuarioTemporal.tipo)) {
            this.usuarioTemporal.tipo = this.usuarioTemporal.tipo.toString();
        }

        const btnGuardarCambios = document.getElementById('btnGuardarCambios') as HTMLElement;
    
		this.usuariosService.editUsuario(this.usuarioTemporal).then(response => {
			this.userExists = response;

			if (!response) {
                btnGuardarCambios.setAttribute('data-bs-toggle', 'modal');
				btnGuardarCambios.click();
                this.cambio = false;
				this.usuarioModificado.emit();
			}
		});
    }

    cambioRealizado(){
        this.cambio = true;
    }

    resetForm() {
        if (this.editForm) {
            this.userExists = false;
            this.cambio = false;
            this.pswCambiada = false;

            const btnGuardarCambios = document.getElementById('btnGuardarCambios') as HTMLElement;
            btnGuardarCambios.removeAttribute('data-bs-toggle');
        }

        if(this.editPasswordForm) {
            this.editPasswordForm.resetForm();
        }
    }

    async editPassword(){
        try {
            if(this.usuario){
                this.usuarioEditarContrasena.correo = this.usuario?.correo;
                this.pswCambiada = await this.usuariosService.editContrasena(this.usuarioEditarContrasena);
                alert("Contraseña cambiada.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    contrasenasCoinciden(): boolean {
        return this.usuarioEditarContrasena.nuevaContrasena === this.usuarioEditarContrasena.confirmarContrasena;
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
