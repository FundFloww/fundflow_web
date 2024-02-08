import { Component } from '@angular/core';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeaItemComponent } from '../../idea-item/idea-item.component';
import { IdeaDto } from '../../interfaces/ideaDto';
import { IdeasServicioService } from '../../servicios/ideas-servicio.service';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-perfil-emprendedor',
    standalone: true,
    imports: [IdeaItemComponent, SideBarComponent, NgIf],
    templateUrl: './perfil-emprendedor.component.html',
    styleUrl: './perfil-emprendedor.component.scss'
})

export class PerfilEmprendedorComponent {
    ideas: IdeaDto[] = [];
    open: boolean = true;
    session: boolean | null = null;
    usuario!: Usuario | null;

    constructor(
        private ideaService: IdeasServicioService, 
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        this.ideas = await this.ideaService.getIdeasUser();
        this.session = await this.usuariosService.initializeSession();
        this.usuario = await this.usuariosService.getUsuario();
    }

    onOpenBar() {
        this.open = onOpenBarFunction(this.open);
    }
}
