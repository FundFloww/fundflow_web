import { Component } from '@angular/core';
import { camposKeys, Campos } from '../enum/campos';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UsuariosService } from '../servicios/usuarios.service';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
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
    camposSeleccionados: string[] = [];

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
        this.open = onOpenBarFunction(this.open);
    }

    toggleCampo(campo: string) {
        if (this.camposSeleccionados.includes(campo)) {
            this.camposSeleccionados = this.camposSeleccionados.filter(c => c !== campo);
            console.log(this.camposSeleccionados);
        } else {
            this.camposSeleccionados.push(campo);
            console.log(this.camposSeleccionados);
        }

        // this.filtrarIdeas();
    }

    async filtrarIdeas() {
        try {
            const camposEnum: Campos[] = this.camposSeleccionados.map(campo => Campos[campo as keyof typeof Campos]);

            this.ideas = await this.ideaService.getIdeasFiltradas(camposEnum);
        } catch (error) {
            console.error("Ocurrió un error al filtrar las ideas: ", error);
        }
    }

    isSelected(campo: string): boolean {
        return this.camposSeleccionados.includes(campo);
    }
}
