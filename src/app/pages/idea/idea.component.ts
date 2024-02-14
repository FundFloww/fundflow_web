import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { Idea } from '../../interfaces/idea';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { GuardarIdea } from '../../interfaces/GuardarIdea';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [SideBarComponent, RouterLink],
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
    guardada: boolean = false;
    propietario: boolean = false;
    ideaId: number | null = null;

    async ngOnInit() {
        const ideas = await this.ideaService.getIdeasAll();
        this.ideaId = parseInt(this.router.url.split('/')[2]);

        if(ideas.filter(idea => idea.id === this.ideaId).length === 0) {
            this.router.navigate(['/']);
        }

        this.session = await this.usuarioService.loggedIn();
        this.idea = ideas.filter(idea => idea.id === this.ideaId)[0];
        this.imagenMain = this.idea.imagenes[0];
        this.nombreCompleto = this.idea.emprendedor[0].nombre + " " + this.idea.emprendedor[0].apellidos;
        if(this.session) {
            const idUsuario = parseInt(this.usuarioService.getUserId()!);
            const guardadas = await this.ideaService.getIdeasGuardadas(idUsuario);
            this.guardada = guardadas.filter(guardada => guardada.id === this.ideaId).length > 0;

            if(this.idea.emprendedor[0].id === idUsuario) {
                this.propietario = true;
            }
        }

        if(this.guardada) this.invertirStyleGuardar();
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

    onClickProfile() {
        const id = this.idea?.emprendedor[0].id;
        this.router.navigate(['/perfil', id]);
    }

    invertirStyleGuardar() {
        const button = document.getElementById("boton-guardar") as HTMLElement;
        const text = document.getElementById("texto-boton") as HTMLElement;
        const icon = document.getElementById("guardar-tick") as HTMLElement;
        
        if(button.textContent !== "Añadir a favoritos!") {
            text.textContent = "Guardar";
            icon.style.display = "none";
            button.style.backgroundColor = "";
            return;
        }

        text.textContent = "";
        icon.style.display = "block";
        button.style.backgroundColor = "rgb(18, 164, 18)";
    }

    async onClickGuardar() {
    
        this.invertirStyleGuardar();
        
        const datosGuardar: GuardarIdea = {
            idIdea: this.idea?.id!,
            idUsuario: parseInt(this.usuarioService.getUserId()!)
        };

        if(!this.guardada) {
            await this.usuarioService.guardarIdea(datosGuardar);
            return;
        }

        await this.usuarioService.eliminarIdeaGuardada(datosGuardar);
    
        return;
    }
}
