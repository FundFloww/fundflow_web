import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-side-bar-elemento',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './side-bar-elemento.component.html',
    styleUrl: './side-bar-elemento.component.scss'
})
export class SideBarElementoComponent {
    @Input() elemento: any;
    @Input() open: boolean;

    constructor() {
        this.open = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes['open'] === undefined) return;

        const sideElements = document.getElementsByClassName('side-element')!;
        
        if(!changes['open'].currentValue) {
            for (let i = 0; i < sideElements.length; i++) {
                sideElements[i].classList.add("small-bar-mode");
            }

            return;
        }

        for (let i = 0; i < sideElements.length; i++) {
            sideElements[i].classList.remove("small-bar-mode");
        }
    }
}
