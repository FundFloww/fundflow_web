import { Component } from '@angular/core';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeaItemComponent } from '../../components/idea-item/idea-item.component';
import { IdeaDto } from '../../interfaces/ideaDto';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-perfil-inversor',
    standalone: true,
    imports: [IdeaItemComponent, SideBarComponent, NgIf, RouterLink, NgClass],
    templateUrl: './perfil-inversor.component.html',
    styleUrl: './perfil-inversor.component.scss'
})
export class PerfilInversorComponent {
    inversiones: IdeaDto[] = [];
    guardados: IdeaDto[] = [];
    open: boolean = true;
    session: boolean | null = null;
    usuario!: Usuario | null;
    idUsuario: number | undefined;
    idUsuarioIdentificado: number | undefined;
    ver: string = "Inversiones";
    mismoId: boolean = false;

    constructor(
        private ideaService: IdeasServicioService,
        private usuariosService: UsuariosService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(params => {
            this.idUsuario = params['id'];
        })
        // this.ideas = await this.ideaService.getIdeasUser();
        this.session = await this.usuariosService.initializeSession();
        this.idUsuarioIdentificado = parseInt(await this.usuariosService.getUserId() ?? '0');
        this.usuario = await this.usuariosService.getUsuarioPorId(this.idUsuario ?? 0);
        this.inversiones = await this.ideaService.getIdeasInvertidas(this.usuario?.id ?? 0);
        this.guardados = await this.ideaService.getIdeasGuardadas(this.usuario?.id ?? 0);
        
        if (this.idUsuario == this.idUsuarioIdentificado) {
            this.mismoId = true;
        }
    }

    onOpenBar() {
        const cerrarBar = document.getElementById('cerrar-bar')!;

        if (getComputedStyle(cerrarBar).display === 'none') {
            return;
        }
        this.open = onOpenBarFunction(this.open);
    }

}
