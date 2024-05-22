import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IdeaItemComponent } from '../../components/idea-item/idea-item.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Noticia } from '../../interfaces/noticia';
import { NoticiasService } from '../../services/noticias/noticias.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-noticias',
    standalone: true,
    imports: [
        SideBarComponent,
        IdeaItemComponent,
        HeaderComponent,
        FormsModule, 
        CommonModule
    ],
    templateUrl: './noticias.component.html',
    styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
    open: boolean = true;
    session: boolean | null = null;
    filterSearch: string = '';
    noticias: Noticia[] = [];
    noticiasNotFound: boolean = true;

    constructor(
        private usuariosService: UsuariosService,
        private noticiasService: NoticiasService
    ) { }

    async ngOnInit() {
        this.session = await this.usuariosService.loggedIn();
        this.cargarNoticias();
    }

    async cargarNoticias() {
        try {
            this.noticias = await this.noticiasService.getNoticiasMostrar(this.filterSearch.trim());
            this.updateNoticiasNotFound();

        } catch (error) {
            this.updateNoticiasNotFound();
            console.error("Ocurrió un error al obtener las noticias: ", error);
        }
    }

    updateNoticiasNotFound() {
        this.noticiasNotFound = (this.noticias.length === 0);
    }

    onOpenBar(evento?: Event) {
        const cerrarBar = document.getElementById('cerrar-bar')!;

        if (evento?.target !== cerrarBar.children[0]) {
            return;
        }

        if (getComputedStyle(cerrarBar).display === 'none') {
            return;
        }

        this.open = onOpenBarFunction(this.open);
    }

    onFilterNoticiasChange(filterValue: string) {
        this.filterSearch = filterValue;
        this.cargarNoticias();
    }
}
