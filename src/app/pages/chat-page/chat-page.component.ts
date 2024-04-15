import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { camposKeys } from '../../enum/campos';
import { IdeaDto } from '../../interfaces/ideaDto';
import { CamposApi } from '../../enum/camposApi';
import { MensajeComponent } from '../../components/mensaje/mensaje.component';
import { WebSocketsService } from '../../services/web-sockets/web-sockets.service';
import { Message } from '../../interfaces/message';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-chat-page',
    standalone: true,
    imports: [SideBarComponent, HeaderComponent, MensajeComponent, NgClass],
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
    ideas: IdeaDto[] = [];
    camposArray: string[] = camposKeys;
    open: boolean = true;
    session: boolean | null = null;
    camposSeleccionados: string[] = [];
    ideasNotFound: boolean = false;
    filterIdeas: string = '';
    messages: Message[] = [];

    constructor(
        private ideaService: IdeasServicioService,
        private usuariosService: UsuariosService,
        private viewContainerRef: ViewContainerRef,
        private webSocketService: WebSocketsService
    ) { }

    async ngOnInit() {
        // try {
        //     this.ideas = await this.ideaService.getIdeas();
        //     this.ideasNotFound = (this.ideas.length === 0) ? true : false;
        // } catch (error) {
        //     console.error("Ocurrió un error al obtener las ideas: ", error);
        // }

        // this.session = await this.usuariosService.loggedIn();
        // this.onScrollMove();

        this.initializeSocketConnection();
    }

    initializeSocketConnection() {
        this.webSocketService.listen(message => {
            this.messages.push(message)
        });
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

    toggleCampo(campo: string) {
        if (this.camposSeleccionados.includes(campo.toLocaleUpperCase())) {
            this.camposSeleccionados = this.camposSeleccionados.filter(c => c !== campo.toLocaleUpperCase());
        } else {
            this.camposSeleccionados.push(campo.toLocaleUpperCase());
        }

        this.filtrarIdeas();
    }

    async filtrarIdeas() {
        try {
            const camposEnum: CamposApi[] = this.camposSeleccionados.map(campo => CamposApi[campo as keyof typeof CamposApi]);
            if (camposEnum.length == 0) {
                this.ngOnInit();
            } else {
                this.ideas = await this.ideaService.getIdeasFiltradas(camposEnum);
                this.ideasNotFound = (this.ideas.length === 0) ? true : false;
            }
        } catch (error) {
            console.error("Ocurrió un error al filtrar las ideas: ", error);
        }
    }

    isSelected(campo: string): boolean {
        return this.camposSeleccionados.includes(campo.toLocaleUpperCase());
    }

    onClickAvanzar() {
        const imagenes = document.getElementById("filters") as HTMLElement;
        imagenes.scrollLeft += 300;
    }

    onClickRetroceder() {
        const imagenes = document.getElementById("filters") as HTMLElement;
        imagenes.scrollLeft -= 300;
    }

    onScrollMove() {
        const imagenes = document.getElementById("filters") as HTMLElement;
        const botonRetroceder = document.getElementsByClassName("retroceder")[0] as HTMLElement;
        const botonAvanzar = document.getElementsByClassName("avanzar")[0] as HTMLElement;

        if (imagenes.scrollLeft < 20) {
            botonRetroceder.classList.add("ocultar");
        } else {
            botonRetroceder.classList.remove("ocultar");
        }

        if (imagenes.scrollWidth - imagenes.scrollLeft - imagenes.clientWidth < 40) {
            botonAvanzar.classList.add("ocultar");
        } else {
            botonAvanzar.classList.remove("ocultar");
        }
    }

    onFilterIdeasChange(filterValue: string) {
        this.filterIdeas = filterValue;
    }

    onClickSend() {
        const inputMessage = document.getElementById("message") as HTMLInputElement;
        const message = inputMessage.value;
        inputMessage.value = "";

        const newMessage: Message = {
            // TODO: Get user name from session
            from: 'me',
            text: message
        }

        this.webSocketService.send(newMessage)
    }

    onClickEnter(e: KeyboardEvent) {
        if(e.key === 'Enter') {
            this.onClickSend();
        }   
    }
}
