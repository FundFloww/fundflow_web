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
import { InversionesService } from '../../services/inversiones/inversiones.service';
import { Inversion } from '../../interfaces/inversion';

@Component({
    selector: 'app-perfil-emprendedor',
    standalone: true,
    imports: [IdeaItemComponent, SideBarComponent, NgIf, RouterLink],
    templateUrl: './perfil-emprendedor.component.html',
    styleUrl: './perfil-emprendedor.component.scss'
})

export class PerfilEmprendedorComponent {
    ideas: IdeaDto[] = [];
    open: boolean = true;
    session: boolean | null = null;
    usuario!: Usuario | null;
    idUsuario: number | undefined;
    idUsuarioIdentificado: number | undefined;
    mismoId: boolean = false;
    inversionesRecibidas: Inversion[] = [];
    totalRecibido: number = 0;

    constructor(
        private ideaService: IdeasServicioService,
        private usuariosService: UsuariosService,
        private inversionesService: InversionesService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(params => {
            this.idUsuario = params['id'];
        })
        this.ideas = await this.ideaService.getIdeasUser(this.idUsuario ?? 0);
        this.idUsuarioIdentificado = parseInt(this.usuariosService.getUserId() ?? '0');
        this.session = await this.usuariosService.initializeSession();
        this.usuario = await this.usuariosService.getUsuarioPorId(this.idUsuario ?? 0);
        this.inversionesRecibidas = await this.inversionesService.getInversionesUsuario(this.idUsuario ?? 0);
        this.totalRecibido = this.inversionesRecibidas.reduce((acc, inv) => acc + inv.cantidad, 0);
        
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
