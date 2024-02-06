import { Component } from '@angular/core';
import { camposKeys } from '../enum/campos';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UsuariosService } from '../servicios/usuarios.service';
import { onOpenBar } from '../functions/sideBarFunctions';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [SideBarComponent, IdeaItemComponent, HeaderComponent],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss'
})
export class InicioComponent {
    ideas: IdeaDto[] = [];
    camposArray: string[] = camposKeys;
    open: boolean = true;
    session: boolean | null = null;

    constructor(
        private ideaService: IdeasServicioService, 
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        try {
            this.ideas = await this.ideaService.getIdeas();
        } catch (error) {
            console.error("Ocurrió un error al obtener las ideas: ", error);
        }

        this.session = await this.usuariosService.loggedIn();
    }

    onOpenBar() {
        this.open = onOpenBar(this.open);
    }
}
