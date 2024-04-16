import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IdeaItemComponent } from '../../components/idea-item/idea-item.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    SideBarComponent, 
    IdeaItemComponent, 
    HeaderComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
    open: boolean = true;
    session: boolean | null = null;
    filterSearch: string = '';

    constructor(
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        this.session = await this.usuariosService.loggedIn();
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

    onFilterIdeasChange(filterValue: string) {
        this.filterSearch = filterValue;
    }
}
