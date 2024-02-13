import { Component } from '@angular/core';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeaItemComponent } from '../../idea-item/idea-item.component';
import { IdeaDto } from '../../interfaces/ideaDto';
import { IdeasServicioService } from '../../servicios/ideas-servicio.service';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
    id: number = 0;

    constructor(
        private ideaService: IdeasServicioService, 
        private usuariosService: UsuariosService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.paramMap.subscribe(params => {
            const idString = params.get('id');
            const nombre = params.get('nombre');
            if (idString) {
                this.id = parseInt(idString, 10);
            }
        })
    }

    async ngOnInit() {
        // this.route.paramMap.subscribe(params => {
        //     const id = params.get('id');
        //     if (id !== null) {
        //         this.id = id;
        //         this.usuario = await this.usuariosService.getUsuario(id)
        //     }
        // })
        this.session = await this.usuariosService.initializeSession();
        this.usuario = await this.usuariosService.getUsuario(this.id);
        this.ideas = await this.ideaService.getIdeasUser(this.id);
    }

    onOpenBar() {
        this.open = onOpenBarFunction(this.open);
    }
}
