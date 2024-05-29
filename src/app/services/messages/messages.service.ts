import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor() { }

    private apiURL = environment.baseUrl;

    public getChatMessages(idSender: string, idReceiver: string) {
        const [idA, idB] = [idSender, idReceiver].sort();
        return fetch(`${this.apiURL}/messages/${idA}/${idB}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }

    public notReadMessages(idSender: string, idReceiver: string) {
        const [idA, idB] = [idSender, idReceiver].sort();
        return fetch(`${this.apiURL}/noRead/${idA}/${idB}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }

    public getUsersHistory(id: number) {
        return fetch(`${this.apiURL}/history/${id}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
    }
}
