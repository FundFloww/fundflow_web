import { NgClass } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MensajeComponent } from '../../components/mensaje/mensaje.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { Message } from '../../interfaces/message';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioDatos } from '../../interfaces/UsuarioDatos';
import { MessagesService } from '../../services/messages/messages.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { WebSocketsService } from '../../services/web-sockets/web-sockets.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';


@Component({
    selector: 'app-chat-page',
    standalone: true,
    imports: [SideBarComponent, HeaderComponent, MensajeComponent, NgClass, PickerComponent],
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {

    open: boolean = true;
    messages: Message[] = [];
    user: Usuario | null = null;
    session: boolean | null = null;
    chatHistory: UsuarioDatos[] = [];
    reciverId: number | null = null;
    userChatConected: Usuario | null = null;

    constructor(
        private usuariosService: UsuariosService,
        private webSocketService: WebSocketsService,
        private messagesService: MessagesService,
        private el: ElementRef,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        this.user = await this.usuariosService.getUsuario();
        this.session = await this.usuariosService.loggedIn();
        this.chatHistory = await this.getChatHistory();
        this.route.params.subscribe(params => {
            console.log(params['id']);
            
            if(params['id']) this.onClickChat(params['id']);
        })
    }

    async getChatHistory() {
        const users: UsuarioDatos[] = await this.messagesService.getUsersHistory(this.user!.id!);
        users.map(async user => {
            const messages: Message[] = await this.notReadMessages(user.id);
            const unReadMessages = messages.filter(message => message.sender !== this.user!.nombre && !message.read)    

            if (unReadMessages.length > 0) user.pendingMessages = unReadMessages.length;
        })

        return users;
    }

    async notReadMessages(idReceiver: number) {
        return await this.messagesService.notReadMessages(this.user!.id!.toString(), idReceiver.toString());
    }

    async getChatMessages(idReceiver: number) {
        return await this.messagesService.getChatMessages(this.user!.id!.toString(), idReceiver.toString());
    }

    async onClickChat(idReceiver: number) {
        const chatZone = this.el.nativeElement.querySelector('.chat-zone')! as HTMLElement;
        this.userChatConected = await this.usuariosService.getUsuarioPorId(idReceiver);
        this.reciverId = idReceiver;
        this.messages = await this.getChatMessages(idReceiver);
        this.initializeSocketConnection();

        if (this.user && this.user.id) {
            this.webSocketService.listen(message => {
                this.messages.push(message);
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
            text: message,
            time: new Date()
        }

        this.webSocketService.send(newMessage, this.user!.id!.toString(), this.reciverId!.toString());
    }

    onClickEnter(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this.onClickSend();
        }
    }

    addEmoji($event: any) {
        const inputMessage = document.getElementById("message") as HTMLInputElement;
        inputMessage.value += $event.emoji.native;
    }
}
