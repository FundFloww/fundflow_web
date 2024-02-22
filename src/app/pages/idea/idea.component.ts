import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { Idea } from '../../interfaces/idea';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { GuardarIdea } from '../../interfaces/GuardarIdea';
import { RouterLink } from '@angular/router';
import { InversionesService } from '../../services/inversiones/inversiones.service';
import { Inversion } from '../../interfaces/inversion';
import { NgClass } from '@angular/common';
import { Hito } from '../../interfaces/hito';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [SideBarComponent, RouterLink, NgClass, FormsModule, NgIf],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss'
})
export class IdeaComponent {

    constructor(
        private usuarioService: UsuariosService,
        private ideaService: IdeasServicioService,
        private inversionesService: InversionesService,
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
    inversionesRecibidas: Inversion[] = [];
    totalRecibido: number = 0;
    fechaHoy = new Date().toISOString().split('T')[0].split('-').reverse().join('/');
    nuevoHito: boolean = false;
    tipoUsuario: string | null = null;
    guardandoIdea: boolean = false;
    cargandoIdeas: boolean = false;
    hito: Hito = {
        titulo: "",
        fecha: new Date(),
        texto: ""
    };

    async ngOnInit() {
        this.cargandoIdeas = true;
        const ideas = await this.ideaService.getIdeasAll();
        this.ideaId = parseInt(this.router.url.split('/')[2]);

        if(ideas.filter(idea => idea.id === this.ideaId).length === 0) {
            this.router.navigate(['/']);
        }

        this.session = await this.usuarioService.loggedIn();
        this.idea = ideas.filter(idea => idea.id === this.ideaId)[0];
        this.imagenMain = this.idea.imagenes[0];
        this.nombreCompleto = this.idea.emprendedor[0].nombre + " " + this.idea.emprendedor[0].apellidos;
        this.inversionesRecibidas = this.idea.inversiones;
        this.totalRecibido = this.inversionesRecibidas.reduce((acc, inv) => acc + inv.cantidad, 0);

        if(this.session) {
            const idUsuario = parseInt(this.usuarioService.getUserId()!);
            const usuario = await this.usuarioService.getUsuario();
            const guardadas = await this.ideaService.getIdeasGuardadas(idUsuario);
            
            this.guardada = guardadas.filter(guardada => guardada.id === this.ideaId).length > 0;
            this.tipoUsuario = usuario.tipo[0];

            if(this.idea.emprendedor[0].id === idUsuario) {
                this.propietario = true;
            }
        }

        if(this.guardada) this.invertirStyleGuardar();
        if(this.idea.imagenes.length > 1) this.onScrollMove();

        this.cargandoIdeas = false;
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
            text.textContent = "Añadir a favoritos!";
            icon.style.display = "none";
            button.style.backgroundColor = "";
            return;
        }

        text.textContent = "";
        icon.style.display = "block";
        button.style.backgroundColor = "rgb(18, 164, 18)";
    }

    async onClickGuardar() {
        this.disableButton();
    
        this.invertirStyleGuardar();
    
        const datosGuardar: GuardarIdea = {
            idIdea: this.idea?.id!,
            idUsuario: parseInt(this.usuarioService.getUserId()!)
        };
    
        try {
            if(!this.guardada) {
                await this.usuarioService.guardarIdea(datosGuardar);
                this.guardada = true;
            } else {
                await this.usuarioService.eliminarIdeaGuardada(datosGuardar);
                this.guardada = false;
            }
        } catch (error) {
            console.error('Error al procesar la acción:', error);
        } finally {
            this.enableButton();
        }
    }

    disableButton() {
        const button = document.getElementById("boton-guardar") as HTMLButtonElement;
        button.disabled = true;
    }

    enableButton() {
        const button = document.getElementById("boton-guardar") as HTMLButtonElement;
        button.disabled = false;
    }

    onClickNuevoHito() {
        this.nuevoHito = true;
    }

    async onClickGuardarHito() {     
        await this.ideaService.guardarHito(this.ideaId ?? 0, this.hito);
        await this.updateIdea();
    }

    onClickCancelarHito() {
        this.nuevoHito = false;
    }

    async onClickEliminarHito(hito: Hito) {
        await this.ideaService.eliminarHito(this.ideaId ?? 0, hito);
        await this.updateIdea();
        
    }

    async updateIdea() {
        const ideas = await this.ideaService.getIdeasAll();
        this.idea = ideas.filter(idea => idea.id === this.ideaId)[0];
    }

    onClickAvanzar() {
        const imagenes = document.getElementById("imagenes-container") as HTMLElement;
        imagenes.scrollLeft += 300;
    }

    onClickRetroceder() {
        const imagenes = document.getElementById("imagenes-container") as HTMLElement;
        imagenes.scrollLeft -= 300;
    }

    onScrollMove() {
        const imagenes = document.getElementById("imagenes-container") as HTMLElement;
        const botonRetroceder = document.getElementsByClassName("retroceder")[0] as HTMLElement;
        const botonAvanzar = document.getElementsByClassName("avanzar")[0] as HTMLElement;

        if(imagenes.scrollLeft < 20) {
            botonRetroceder.classList.add("ocultar");
        } else {
            botonRetroceder.classList.remove("ocultar");
        }

        if(imagenes.scrollWidth - imagenes.scrollLeft - imagenes.clientWidth < 40) {
            botonAvanzar.classList.add("ocultar");
        } else {
            botonAvanzar.classList.remove("ocultar");
        }
    }

}
