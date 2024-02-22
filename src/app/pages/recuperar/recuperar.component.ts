import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuarioDTO } from '../../interfaces/loginDto';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { re } from 'mathjs';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    RouterModule
],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.scss'
})
export class RecuperarComponent {
    constructor(
        private usuariosService: UsuariosService, 
        private router: Router,
        private route: ActivatedRoute
    ) { }

    userNotExist: boolean = false;
    registroExitoso: boolean = false;
    cargandoRecuperar: boolean = false;

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
        this.cargandoRecuperar = true;
        this.usuario.correo = this.usuario.correo.toLowerCase();
        const response = await this.usuariosService.recuperarContrasena(this.usuario.correo)
        
        if(!response) {
            this.userNotExist = true;
            this.cargandoRecuperar = false;
            return;
        }

        this.cargandoRecuperar = false;
        this.router.navigate(['/login']);
    }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid && !this.userNotExist,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
    }
}
