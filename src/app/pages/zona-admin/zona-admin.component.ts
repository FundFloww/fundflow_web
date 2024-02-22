import { Component } from '@angular/core';
import { SideBarAdminComponent } from '../../components/side-bar-admin/side-bar-admin.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-zona-admin',
    standalone: true,
    imports: [
        SideBarAdminComponent,
        RouterOutlet
    ],
    templateUrl: './zona-admin.component.html',
    styleUrl: './zona-admin.component.scss'
})
export class ZonaAdminComponent {
    open: boolean = true;
    session: boolean | null = null;


    onOpenBar(evento?: Event) {
        const cerrarBar = document.getElementById('cerrar-bar')!;

        if(evento?.target !== cerrarBar.children[0]) {
            return;
        }
        
        if(getComputedStyle(cerrarBar).display === 'none') {
            return;
        }

        this.open = onOpenBarFunction(this.open);
    }
}
