import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeaDto } from '../../interfaces/ideaDto';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { Idea } from '../../interfaces/idea';
import { UsuarioDTO } from '../../interfaces/loginDto';

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
        private ideaService: IdeasServicioService,
        private router: Router
    ) {}

    idea: Idea | null = null;
    open: boolean = true;
    session: boolean | null = null;
    nombreCompleto: string | null = null;
    imagenMain: string | null = null;

    async ngOnInit() {
        const ideas = await this.ideaService.getIdeasAll();
        const ideaId = parseInt(this.router.url.split('/')[2]);

        if(ideas.filter(idea => idea.id === ideaId).length === 0) {
            this.router.navigate(['/']);
        }

        this.session = await this.usuarioService.loggedIn();
        this.idea = ideas.filter(idea => idea.id === ideaId)[0];
        this.imagenMain = this.idea.imagenes[0];
        this.nombreCompleto = this.idea.emprendedor[0].nombre + " " + this.idea.emprendedor[0].apellidos;
    }

    onOpenBar() {
        this.open = onOpenBarFunction(this.open);

        const invertirSection = document.getElementById('invertir-section');
        invertirSection?.classList.toggle('col-11-p');
    }

    onClickImage(event: Event) {
        const imagenSelected = event.target as HTMLElement;
        const overlayContenedor = document.getElementById("overlay");
        const imagenContenedor = document.getElementById("image-overlay");

        overlayContenedor?.classList.add("overlay-visible");
        imagenContenedor?.setAttribute("src", (imagenSelected.getAttribute("src")!));
    }

    onCloseImage() {
        const overlayContenedor = document.getElementById("overlay");
        overlayContenedor?.classList.toggle("overlay-visible");
    }

    onClickGuardar(event: Event) {
        const button = event.target as HTMLElement;
        const icon = document.getElementById("guardar-tick") as HTMLElement;
        button.classList.toggle("button-guardar-activo");

        if(button.textContent == "Guardar") {
            button.textContent = "";
            icon.style.display = "block";
        } else {
            button.textContent = "Guardar";
        }
    }
}
