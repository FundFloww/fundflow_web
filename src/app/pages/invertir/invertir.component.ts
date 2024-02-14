import { Component } from '@angular/core';
import { IdeaDto } from '../../interfaces/ideaDto';
import { HeaderComponent } from '../../components/header/header.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invertir',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent],
  templateUrl: './invertir.component.html',
  styleUrl: './invertir.component.scss'
})
export class InvertirComponent {
    constructor(
        private usuariosService: UsuariosService
    ) { }

    ideas: IdeaDto[] = [];
    open: boolean = true;
    session: boolean | null = null;

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
