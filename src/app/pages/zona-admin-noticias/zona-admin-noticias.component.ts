import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias/noticias.service';
import { Noticia } from '../../interfaces/noticia';
import { NuevaNoticiaModalComponent } from '../../components/nueva-noticia-modal/nueva-noticia-modal.component';
import { ModificarNoticiaModalComponent } from '../../components/modificar-noticia-modal/modificar-noticia-modal.component';

@Component({
    selector: 'app-zona-admin-noticias',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        NuevaNoticiaModalComponent,
        ModificarNoticiaModalComponent
    ],
    templateUrl: './zona-admin-noticias.component.html',
    styleUrl: './zona-admin-noticias.component.scss'
})
export class ZonaAdminNoticiasComponent {

    filterSearch = '';
    dateSearch: string = '';
    dateSearchString: string = '';
    noticias: Noticia[] = [];
    noticiasNotFound: boolean = true;
    currentPage: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    registrosTotales: number = 0;
    fechaCreacion: Date | null = null;

    noticia: Noticia = {
        titulo: '',
        link: '',
        descripcion: '',
        fecha: null
    };

    constructor(
        private noticiasService: NoticiasService
    ) { }

    ngOnInit() {
        this.cargarNoticias();
    }

    async cargarNoticias() {
        try {

            const res = await this.noticiasService.getNoticias(this.currentPage, this.pageSize, this.filterSearch.trim(), this.dateSearch);
            if (res != null) {
                this.noticias = res.content;
                this.totalPages = res.totalPages;
                this.currentPage = res.pageable.pageNumber;
                this.registrosTotales = res.totalElements;
            } else {
                this.noticias = [];
                this.totalPages = 0;
                this.currentPage = 0;
                this.registrosTotales = 0;
            }
            this.updateNoticiasNotFound();

        } catch (error) {
            this.updateNoticiasNotFound();
            console.error("Ocurrió un error al obtener las noticias: ", error);
        }
    }

    updateNoticiasNotFound() {
        this.noticiasNotFound = (this.noticias.length === 0);
    }

    onInputFechaOBusqueda() {
        this.currentPage = 0;
        this.cargarNoticias();
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
        }
    }

    borrarNoticia(id: number | undefined) {
        if (id !== undefined) {
            const resp = confirm("Seguro que quiere eliminar la noticia con ID: " + id + "?");
            if (resp) {
                this.noticiasService.deleteNoticia(id).then(() => {
                    if (this.noticias.length == 1) {
                        this.noticias = [];
                    } else {
                        this.cargarNoticias();
                    }
                });
            }
        }
    }

    cargarModificaciones() {
        this.cargarNoticias();
    }

}
