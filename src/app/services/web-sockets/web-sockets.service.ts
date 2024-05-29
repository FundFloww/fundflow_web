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
        this.connection = Stomp.client(`ws://${environment.ipBack}/websocket`);
        this.connection.connect({}, () => { });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public async send(message: Message, idSender: string, idReceiver: string): Promise<void> {
        if (this.connection && this.connection.connected) {
            const validMessage = await this.validateMessage(message.text);

            if (!validMessage) {
                alert('El mensaje no cumple las politicas de aceptación');
                return;
            }

            const endpoint = this.generateEndpoint("/app/chat", idSender, idReceiver);
            this.connection.send(endpoint, {}, JSON.stringify(message));
        } else {
            console.error('La conexión WebSocket no está establecida.');
        }
    }

    public listen(fun: ListenerCallBack, idSender: string, idReceiver: string): void {
        if (this.connection) {
            this.connection.disconnect();
            this.connection.connect({}, () => {
                const endpoint = this.generateEndpoint("/topic/messages", idSender, idReceiver);
                this.subscription = this.connection!.subscribe(endpoint, message => fun(JSON.parse(message.body)));
            });
        }
    }

    public generateEndpoint(route: string, idSender: string, idReceiver: string): string {
        const [idA, idB] = [idSender, idReceiver].sort();
        return `${route}/${idA}/${idB}`;
    }

    private async validateMessage(message: string): Promise<boolean> {
        const response = await fetch(`http://${environment.ipOllama}/api/validate/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        const { isValid } = data;
        
        return isValid;
    }
}