import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [NgClass],
  template: '<p class="message" [ngClass]="{ foreing : message.from !== me}"><span class="from">{{message.from}}:</span> {{message.text}}</p>',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent {
    @Input() message: Message = { from: '', text: '' };
    me = 'me';
}
