
import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs/src/stomp-subscription';
import { Message } from '../../interfaces/message';
import { environment } from '../../../environments/environment';

export type ListenerCallBack = (message: Message) => void;

@Injectable({
    providedIn: 'root'
})
export class WebSocketsService implements OnDestroy {

    private connection: CompatClient | undefined = undefined;
    private subscription: StompSubscription | undefined;

    constructor() { 
        this.connection = Stomp.client(`ws://${environment.ip}/websocket`);
        this.connection.connect({}, () => { });
    }

    public send(message: Message, idSender: string, idReceiver: string): void {
        if (this.connection && this.connection.connected) {
            const endpoint = this.generateEndpoint("/app/chat" ,idSender, idReceiver);
            this.connection.send(endpoint, {}, JSON.stringify(message));
        } else {
            console.error('La conexión WebSocket no está establecida.');
        }
    }

    public listen(fun: ListenerCallBack, idSender: string, idReceiver: string): void {
        if (this.connection) {
            this.connection.disconnect();
            this.connection.connect({}, () => {   
                const endpoint = this.generateEndpoint("/topic/messages" ,idSender, idReceiver);
                this.subscription = this.connection!.subscribe(endpoint, message => fun(JSON.parse(message.body)));
            });
        }
    }

    public generateEndpoint(route: string, idSender: string, idReceiver: string): string {
        const [idA, idB] = [idSender, idReceiver].sort();
        return `${route}/${idA}/${idB}`;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}