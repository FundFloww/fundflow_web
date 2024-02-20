import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaItemComponent } from '../components/idea-item/idea-item.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { TipoUsuario } from '../enum/tipo-usuario';
import { Usuario } from '../interfaces/usuario';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { PerfilEmprendedorComponent } from './perfil-emprendedor/perfil-emprendedor.component';
import { PerfilInversorComponent } from './perfil-inversor/perfil-inversor.component';

@Component({
    selector: 'app-perfiles',
    standalone: true,
    templateUrl: './perfiles.component.html',
    styleUrl: './perfiles.component.scss',
    imports: [SideBarComponent, IdeaItemComponent, NgIf, PerfilEmprendedorComponent, PerfilInversorComponent]
})
export class PerfilesComponent {
    usuario!: Usuario | null;
    idUsuario: number | undefined;
    tipo: TipoUsuario | undefined;

    constructor(
        private usuariosService: UsuariosService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(params => {
            this.idUsuario = params['id'];
        });

        if(this.idUsuario == 0) {
            const session = await this.usuariosService.loggedIn();
            if(session) {
                this.idUsuario = parseInt(this.usuariosService.getUserId()!);
                
            } else {
                this.router.navigate(['/login']);
                return;
            }
        }

        const usuario = await this.usuariosService.getUsuarioPorId(this.idUsuario ?? 0);
        this.tipo = usuario.tipo;
    }
}