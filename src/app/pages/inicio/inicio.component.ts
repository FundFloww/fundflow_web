import { Component } from '@angular/core';
import { camposKeys, Campos, camposValues } from '../../enum/campos';
import { IdeaItemComponent } from '../../components/idea-item/idea-item.component';
import { IdeaDto } from '../../interfaces/ideaDto';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { HeaderComponent } from '../../components/header/header.component';
import { CamposApi } from '../../enum/camposApi';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdeasFilterPipe } from '../../pipes/ideas/ideas-filter.pipe';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [
        SideBarComponent, 
        IdeaItemComponent, 
        HeaderComponent,
        FormsModule, 
        CommonModule,
        IdeasFilterPipe
    ],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss'
})
export class InicioComponent {
    ideas: IdeaDto[] = [];
    camposArray: string[] = camposKeys;
    open: boolean = true;
    session: boolean | null = null;
    camposSeleccionados: string[] = [];
    ideasNotFound: boolean = false;
    filterSearch: string = '';

    constructor(
        private ideaService: IdeasServicioService, 
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        try {
            this.ideas = await this.ideaService.getIdeas();
            this.ideasNotFound = (this.ideas.length === 0) ? true : false;
        } catch (error) {
            console.error("Ocurrió un error al obtener las ideas: ", error);
        }

        this.session = await this.usuariosService.loggedIn();
        this.onScrollMove();
    }

    onOpenBar(evento?: Event) {
        const cerrarBar = document.getElementById('cerrar-bar')!;

        if(evento?.target !== cerrarBar.children[0]) {
            return;
        }
        
        if(getComputedStyle(cerrarBar).display === 'none') {
            return;
        }

        this.open = onOpenBarFunction(this.open);
    }

    toggleCampo(campo: string) {
        if (this.camposSeleccionados.includes(campo.toLocaleUpperCase())) {
            this.camposSeleccionados = this.camposSeleccionados.filter(c => c !== campo.toLocaleUpperCase());
        } else {
            this.camposSeleccionados.push(campo.toLocaleUpperCase());
        }

        this.filtrarIdeas();
    }

    async filtrarIdeas() {
        try {
            const camposEnum: CamposApi[] = this.camposSeleccionados.map(campo => CamposApi[campo as keyof typeof CamposApi]);
            if(camposEnum.length == 0) {
                this.ngOnInit();
            } else {
                this.ideas = await this.ideaService.getIdeasFiltradas(camposEnum);
                this.ideasNotFound = (this.ideas.length === 0) ? true : false;
            }
        } catch (error) {
            console.error("Ocurrió un error al filtrar las ideas: ", error);
        }
    }

    isSelected(campo: string): boolean {
        return this.camposSeleccionados.includes(campo.toLocaleUpperCase());
    }

    onClickAvanzar() {
        const imagenes = document.getElementById("filters") as HTMLElement;
        imagenes.scrollLeft += 300;
    }

    onClickRetroceder() {
        const imagenes = document.getElementById("filters") as HTMLElement;
        imagenes.scrollLeft -= 300;
    }

    onScrollMove() {
        const imagenes = document.getElementById("filters") as HTMLElement;
        const botonRetroceder = document.getElementsByClassName("retroceder")[0] as HTMLElement;
        const botonAvanzar = document.getElementsByClassName("avanzar")[0] as HTMLElement;

        if(imagenes.scrollLeft < 20) {
            botonRetroceder.classList.add("ocultar");
        } else {
            botonRetroceder.classList.remove("ocultar");
        }

        if(imagenes.scrollWidth - imagenes.scrollLeft - imagenes.clientWidth < 40) {
            botonAvanzar.classList.add("ocultar");
        } else {
            botonAvanzar.classList.remove("ocultar");
        }
    }

    onFilterIdeasChange(filterValue: string) {
        this.filterSearch = filterValue;
    }
}
