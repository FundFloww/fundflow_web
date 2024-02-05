import { Component } from '@angular/core';
import { onOpenBar } from '../functions/sideBarFunctions';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UsuariosService } from '../servicios/usuarios.service';
import { Usuario } from '../interfaces/usuario';
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
        private usuariosService: UsuariosService,
        private router: Router
    ) { }

    async ngOnInit() {
        await this.initializeIdeas();
        await this.initializeSession();
        await this.initializeUsuario();
    }

    async initializeIdeas() {
        try {
            this.ideas = await this.ideaService.getIdeas();
        } catch (error) {
            console.error("Ocurrió un error al obtener las ideas: ", error);
        }
    }

    async initializeSession() {
        this.session = await this.usuariosService.loggedIn();
        if(!this.session) {
            this.router.navigate(['/inicio']);    
        }
    }

    async initializeUsuario() {
        this.usuario = await this.usuariosService.getUsuario();
    }

    onOpenBar() {
        this.open = onOpenBar(this.open);
    }

}
