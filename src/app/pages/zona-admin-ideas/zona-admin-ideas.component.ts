import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { IdeaDto } from '../../interfaces/ideaDto';

@Component({
	selector: 'zona-admin-ideas',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
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
    pageSize: number = 10;
    registrosTotales: number = 0;

	constructor(
        private ideasService: IdeasServicioService
    ) { }

    ngOnInit() {
        this.cargarIdeas();
    }

    async cargarIdeas() {
        try {
            // const res = await this.ideasService.getNoticias(this.currentPage, this.pageSize, this.filterSearch.trim());
            // if (res != null) {
            //     this.ideas = res.content;
            //     this.totalPages = res.totalPages;
            //     this.currentPage = res.pageable.pageNumber;
            //     this.registrosTotales = res.totalElements;
            // } else {
            //     this.ideas = [];
            //     this.totalPages = 0;
            //     this.currentPage = 0;
            //     this.registrosTotales = 0;
            // }
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
}
