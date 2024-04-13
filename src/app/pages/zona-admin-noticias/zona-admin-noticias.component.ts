import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias/noticias.service';

@Component({
	selector: 'app-zona-admin-noticias',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './zona-admin-noticias.component.html',
	styleUrl: './zona-admin-noticias.component.scss'
})
export class ZonaAdminNoticiasComponent {

	filterSearch = '';
	currentPage: number = 0;
    totalPages: number = 0;
	pageSize: number = 10;
	registrosTotales: number = 0;

	constructor(
        private noticiassService: NoticiasService
    ) { }

	ngOnInit() {
        this.cargarNoticias();
    }

	async cargarNoticias() {
        try {
            // const res = await this.noticiassService.getNoticias(this.currentPage, this.pageSize);
            // if (res.status != 404) {
            //     this.usuarios = res.content;
            //     this.totalPages = res.totalPages;
            //     this.currentPage = res.pageable.pageNumber;
            //     this.registrosTotales = res.totalElements;
            // }
            // this.updateUsuariosNotFound();

        } catch (error) {
            console.error("Ocurrió un error al obtener los usuarios: ", error);
        }
    }

	actualizarPageSize() {
        if (this.pageSize >= this.registrosTotales) {
            this.currentPage = 0;
        }
        this.cargarNoticias();
    }
}
