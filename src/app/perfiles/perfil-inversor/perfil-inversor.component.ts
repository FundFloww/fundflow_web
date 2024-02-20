import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IdeaItemComponent } from '../../components/idea-item/idea-item.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeaDto } from '../../interfaces/ideaDto';
import { Usuario } from '../../interfaces/usuario';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
    selector: 'app-perfil-inversor',
    standalone: true,
    imports: [IdeaItemComponent, SideBarComponent, NgIf, RouterLink, NgClass],
    templateUrl: './perfil-inversor.component.html',
    styleUrl: './perfil-inversor.component.scss'
})
export class PerfilInversorComponent {
    @Input() idUsuario: number | undefined;

    inversionesIdea: IdeaDto[] = [];
    guardados: IdeaDto[] = [];
    open: boolean = true;
    session: boolean | null = null;
    usuario!: Usuario | null;
    idUsuarioIdentificado: number | undefined;
    ver: string = "Inversiones";
    mismoId: boolean = false;
    totalInvertido: number = 0;

    constructor(
        private ideaService: IdeasServicioService,
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        this.session = await this.usuariosService.loggedIn();
        this.idUsuarioIdentificado = parseInt(this.usuariosService.getUserId() ?? '0');
        this.usuario = await this.usuariosService.getUsuarioPorId(this.idUsuario!);
        this.inversionesIdea = await this.ideaService.getIdeasInvertidas(this.usuario?.id ?? 0);
        this.guardados = await this.ideaService.getIdeasGuardadas(this.usuario?.id ?? 0);
        this.totalInvertido = this.usuario.inversiones.reduce((acc, inv) => acc + inv.cantidad, 0);
        
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
