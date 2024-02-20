import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdeaItemComponent } from '../../components/idea-item/idea-item.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeaDto } from '../../interfaces/ideaDto';
import { Inversion } from '../../interfaces/inversion';
import { Usuario } from '../../interfaces/usuario';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { InversionesService } from '../../services/inversiones/inversiones.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
    selector: 'app-perfil-emprendedor',
    standalone: true,
    imports: [IdeaItemComponent, SideBarComponent, NgIf, RouterLink],
    templateUrl: './perfil-emprendedor.component.html',
    styleUrl: './perfil-emprendedor.component.scss'
})

export class PerfilEmprendedorComponent {
    @Input() idUsuario: number | undefined;

    ideas: IdeaDto[] = [];
    open: boolean = true;
    session: boolean | null = null;
    usuario!: Usuario | null;
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
        this.ideas = await this.ideaService.getIdeasUser(this.idUsuario ?? 0);
        this.idUsuarioIdentificado = parseInt(this.usuariosService.getUserId() ?? '0');
        this.session = await this.usuariosService.loggedIn();
        this.usuario = await this.usuariosService.getUsuarioPorId(this.idUsuario!);
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
