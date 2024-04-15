
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

    public send(task: Message): void {
        if (this.connection && this.connection.connected) {
            this.connection.send('/app/chat', {}, JSON.stringify(task));
        }
    }

    public listen(fun: ListenerCallBack): void {
        if (this.connection) {
            this.connection.connect({}, () => {                
                this.subscription = this.connection!.subscribe('/topic/messages', message => fun(JSON.parse(message.body)));
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}