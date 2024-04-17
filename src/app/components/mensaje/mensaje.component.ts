import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-mensaje',
    standalone: true,
    imports: [NgClass],
    template: '<div class="message" [ngClass]="{ foreing : message.sender !== reciver}"><p class="message-text">{{ message.text }}</p> <span class="time">{{ message.time }}</span></div>',
    styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent {
    @Input() message: Message = { sender: '', text: '' };
    @Input() reciver: string = '';
}