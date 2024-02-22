import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
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

    @ViewChild('editForm') editForm!: NgForm;

    constructor(
        private usuariosService: UsuariosService
    ) { }

    // ngOnChanges(changes: SimpleChanges): void {
    //     if (changes['usuario'] && this.usuario) {
    //         console.log(this.usuario);
    //         this.usuarioTemporal = Object.assign({}, this.usuario);
    //         console.log(this.usuarioTemporal);
    //     }
    // }

    ngOnInit(){
        this.usuarioTemporal = Object.assign({}, this.usuario);
    }

    editUsuario(){

    }

    cambioRealizado(){
        this.cambio = true;
    }

    resetForm() {
        if (this.editForm) {
            this.userExists = false;
            this.editForm.resetForm();
            this.usuarioTemporal = Object.assign({}, this.usuario);
        }
    }

    // contrasenasCoinciden(): boolean {
    //     return this.newUsuario.contrasena === this.newUsuario.confirmarContrasena;
    // }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid && !this.userExists,
            [errorClass]: ngModel.touched && (ngModel.invalid || (ngModel.name === 'email' && this.userExists))
        };
    }

    // validPassword(ngModel: NgModel, validClass: string, errorClass: string) {
    //     return {
    //         [validClass]: this.contrasenasCoinciden() && ngModel.touched && !this.userExists,
    //         [errorClass]: (!this.contrasenasCoinciden() || ngModel.errors?.['required']) && ngModel.touched
    //     };
    // }
}
