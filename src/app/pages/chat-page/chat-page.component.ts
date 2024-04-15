import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MensajeComponent } from '../../components/mensaje/mensaje.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { Message } from '../../interfaces/message';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { WebSocketsService } from '../../services/web-sockets/web-sockets.service';

@Component({
    selector: 'app-chat-page',
    standalone: true,
    imports: [SideBarComponent, HeaderComponent, MensajeComponent, NgClass],
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
    open: boolean = true;
    messages: Message[] = [];
    user: Usuario | null = null;
    session: boolean | null = null;

    constructor(
        private usuariosService: UsuariosService,
        private webSocketService: WebSocketsService
    ) { }

    async ngOnInit() {
        this.initializeSocketConnection();
        this.user = await this.usuariosService.getUsuario();
        this.session = await this.usuariosService.loggedIn();
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

    onClickSend() {
        const inputMessage = document.getElementById("message") as HTMLInputElement;
        const message = inputMessage.value;
        inputMessage.value = "";

        const newMessage: Message = {
            from: this.user!.nombre,
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
