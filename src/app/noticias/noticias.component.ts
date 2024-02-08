import { Component } from '@angular/core';
import { camposKeys } from '../enum/campos';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UsuariosService } from '../servicios/usuarios.service';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
import { HeaderComponent } from '../header/header.component';

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
        this.open = onOpenBarFunction(this.open);
    }
}
