import { Component } from '@angular/core';
import { camposKeys } from '../../enum/campos';
import { IdeaItemComponent } from '../../components/idea-item/idea-item.component';
import { IdeaDto } from '../../interfaces/ideaDto';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [SideBarComponent, IdeaItemComponent, HeaderComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss'
})
export class NoticiasComponent {
    open: boolean = true;
    session: boolean | null = null;

    constructor(
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        this.session = await this.usuariosService.loggedIn();
    }

    onOpenBar() {
        const cerrarBar = document.getElementById('cerrar-bar')!; 
        
        if(getComputedStyle(cerrarBar).display === 'none') {
            return;
        }
        
        this.open = onOpenBarFunction(this.open);
    }
}
