import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias/noticias.service';
import { NoticiaFilterPipe } from '../../pipes/noticias/noticia-filter.pipe';
import { Noticia } from '../../interfaces/noticia';
import { NuevaNoticiaModalComponent } from '../../components/nueva-noticia-modal/nueva-noticia-modal.component';

@Component({
	selector: 'app-zona-admin-noticias',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule,
        NoticiaFilterPipe,
        NuevaNoticiaModalComponent
	],
	templateUrl: './zona-admin-noticias.component.html',
	styleUrl: './zona-admin-noticias.component.scss'
})
export class ZonaAdminNoticiasComponent {

	filterSearch = '';
    noticias: Noticia[] = [];
    noticiasNotFound: boolean = false;
	currentPage: number = 0;
    totalPages: number = 0;
	pageSize: number = 10;
	registrosTotales: number = 0;

    noticia!: Noticia | null;

	constructor(
        private noticiasService: NoticiasService
    ) { }

	ngOnInit() {
        this.cargarNoticias();
    }

	async cargarNoticias() {
        try {
            const res = await this.noticiasService.getNoticias(this.currentPage, this.pageSize);
            if (res.status != 404) {
                this.noticias = res.content;
                this.totalPages = res.totalPages;
                this.currentPage = res.pageable.pageNumber;
                this.registrosTotales = res.totalElements;
            }
            this.updateNoticiasNotFound();

        } catch (error) {
            console.error("Ocurrió un error al obtener los usuarios: ", error);
        }
    }

    updateNoticiasNotFound() {
        this.noticiasNotFound = (this.noticias.length === 0);
    }

    async cambiarPagina(pagina: number) {
        if (pagina >= 0 && pagina < this.totalPages) {
            this.currentPage = pagina;
            await this.cargarNoticias();
        }
    }

	actualizarPageSize() {
        if (this.pageSize >= this.registrosTotales) {
            this.currentPage = 0;
        }
        this.cargarNoticias();
    }

    async obtenerNoticiaAModificar(id: number | undefined) {
        if (id != null) {
            this.noticia = await this.noticiasService.getNoticiaPorId(id);
            console.log("obtener usuario");
            console.log(this.noticia);
        }
    }

    borrarNoticia(id: number | undefined) {
        if (id !== undefined) {
            this.noticiasService.deleteNoticia(id).then(() => {
                this.cargarNoticias();
            });
        }
    }

    cargarModificaciones() {
        this.cargarNoticias();
    }
}
