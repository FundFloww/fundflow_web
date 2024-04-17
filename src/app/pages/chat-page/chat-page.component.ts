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
    usersTest: Usuario[] = [];
    reciverId: number | null = null;

    constructor(
        private usuariosService: UsuariosService,
        private webSocketService: WebSocketsService
    ) { }

    async ngOnInit() {
        this.inizializeTestUsers();

        this.user = await this.usuariosService.getUsuario();
        this.session = await this.usuariosService.loggedIn();
    }

    inizializeTestUsers() {
        this.usuariosService.getUsuarioPorId(1)
            .then(usuario => {
                this.usersTest.push(usuario);
            });
        this.usuariosService.getUsuarioPorId(2)
            .then(usuario => {
                this.usersTest.push(usuario);
            });
        this.usuariosService.getUsuarioPorId(3)
            .then(usuario => {
                this.usersTest.push(usuario);
            });
        this.usuariosService.getUsuarioPorId(4)
            .then(usuario => {
                this.usersTest.push(usuario);
            });
    }

    onClickChat(idReceiver: number) {
        this.reciverId = idReceiver;
        this.messages = [];
        this.initializeSocketConnection();

        if (this.user && this.user.id) {
            this.webSocketService.listen(message => {
                console.log(message);
                this.messages.push(message)
            }, this.user.id.toString(), this.reciverId.toString());
        }
    }

    initializeSocketConnection() {
        this.webSocketService.listen(message => {            
            this.messages.push(message)
        }, this.user!.id!.toString(), this.reciverId!.toString());
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
            sender: this.user!.nombre,
            text: message
        }

        this.webSocketService.send(newMessage, this.user!.id!.toString(), this.reciverId!.toString());
    }

    onClickEnter(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this.onClickSend();
        }
    }
}
