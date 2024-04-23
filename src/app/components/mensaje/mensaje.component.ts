import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-mensaje',
    standalone: true,
    imports: [NgClass],
    template: '<div class="message" [ngClass]="{ foreing : message.sender !== reciver}"><p class="message-text">{{ message.text }}</p> <span class="time">{{ date }}</span></div>',
    styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent {
    @Input() message: Message = { sender: '', text: '' };
    @Input() reciver: string = '';
    date? = '';

    ngOnInit() {
        if(!this.message.time) return; 

        if(this.message.time?.toString().length < 6) {
            this.date = this.message.time.toString();
            return;
        } 

        const hours = this.message.time?.toString().split("T")[1].split(".")[0].split(":")
        
        if(hours) {
            this.date = `${hours[0]}:${hours[1]}`;
        }
    }
}