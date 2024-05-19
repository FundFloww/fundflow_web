import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { IdeaDto } from '../../interfaces/ideaDto';
import { IdeaItemAdminComponent } from '../../components/idea-item-admin/idea-item-admin.component';
import { ModificarIdeaModalComponent } from '../../components/modificar-idea-modal/modificar-idea-modal.component';
import { IdeaEditarDto } from '../../interfaces/ideaEditarDto';

@Component({
    selector: 'zona-admin-ideas',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        IdeaItemAdminComponent,
        ModificarIdeaModalComponent
    ],
    templateUrl: './zona-admin-ideas.component.html',
    styleUrl: './zona-admin-ideas.component.scss'
})
export class ZonaAdminIdeasComponent {

    filterSearch = '';
    ideas: IdeaDto[] = [];
    ideasNotFound: boolean = true;
    currentPage: number = 0;
    totalPages: number = 0;
    pageSize: number = 8;
    registrosTotales: number = 0;

    ideaEditar: IdeaEditarDto = {
        titulo: '',
        descripcion: '',
        imagenes: [],
        campo: undefined
    };

    constructor(
        private ideasService: IdeasServicioService
    ) { }

    ngOnInit() {
        this.cargarIdeas();
    }

    async cargarIdeas() {
        try {
            const res = await this.ideasService.getIdeasAdmin(this.currentPage, this.pageSize, this.filterSearch.trim());
            if (res != null) {
                this.ideas = res.content;
                this.totalPages = res.totalPages;
                this.currentPage = res.pageable.pageNumber;
                this.registrosTotales = res.totalElements;
            } else {
                this.ideas = [];
                this.totalPages = 0;
                this.currentPage = 0;
                this.registrosTotales = 0;
            }
            this.updateIdeasNotFound();

        } catch (error) {
            this.updateIdeasNotFound();
            console.error("Ocurrió un error al obtener las ideas: ", error);
        }
    }

    updateIdeasNotFound() {
        this.ideasNotFound = (this.ideas.length === 0);
    }

    actualizarPageSize() {
        if (this.pageSize >= this.registrosTotales) {
            this.currentPage = 0;
        }
        this.cargarIdeas();
    }

    async cambiarPagina(pagina: number) {
        if (pagina >= 0 && pagina < this.totalPages) {
            this.currentPage = pagina;
            await this.cargarIdeas();
        }
    }

    onInputBusqueda() {
        this.currentPage = 0;
        this.cargarIdeas();
    }

    cargarModificaciones() {
        if (this.ideas.length == 1) {
            this.ideas = [];
            this.updateIdeasNotFound();
        } else {
            this.cargarIdeas();
        }
    }

    ideaAModificar(ideaAModificar: IdeaEditarDto) {
        this.ideaEditar = Object.assign({}, ideaAModificar);
    }
}
