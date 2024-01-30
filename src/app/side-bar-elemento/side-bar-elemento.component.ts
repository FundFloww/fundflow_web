import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar-elemento',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-elemento.component.html',
  styleUrl: './side-bar-elemento.component.scss'
})
export class SideBarElementoComponent {
    @Input() elemento: any;
}
