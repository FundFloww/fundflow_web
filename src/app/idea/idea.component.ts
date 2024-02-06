import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Idea } from '../interfaces/idea';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {
    constructor(
        private usuarioService: UsuariosService,
        private ideaRepository: IdeasServicioService,
        private router: Router
    ) {}

    idea: IdeaDto | null = null;
    open: boolean = true;
    session: boolean | null = null;

    async ngOnInit() {
        this.session = await this.usuarioService.initializeSession();

        const ideas = await this.ideaRepository.getIdeas();
        const ideaId = parseInt(this.router.url.split('/')[2]);

        if(ideas.filter(idea => idea.id === ideaId).length === 0) {
            this.router.navigate(['/']);
        }

        this.idea = ideas.filter(idea => idea.id === ideaId)[0];
    }

    onOpenBar() {
        this.open = onOpenBarFunction(this.open);

        const invertirSection = document.getElementById('invertir-section');
        invertirSection?.classList.toggle('col-11-p');
    }
}
