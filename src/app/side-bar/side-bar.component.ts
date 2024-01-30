import { Component } from '@angular/core';
import { SideBarElementoComponent } from '../side-bar-elemento/side-bar-elemento.component';

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [SideBarElementoComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
    rutaIconos = '../../assets/icons/';
    elementos = [
        {
            id: 1,
            nombre: 'Inicio',
            icono: 'home',
            ruta: `${this.rutaIconos}home.svg`
        },
        {
            id: 2,
            nombre: 'Configuración',
            icono: 'settings',
            ruta: `${this.rutaIconos}settings.svg`
        },
        {
            id: 3,
            nombre: 'Ayuda',
            icono: 'help',
            ruta: `${this.rutaIconos}help.svg`
        },
        {
            id: 4,
            nombre: 'Cerrar sesión',
            icono: 'logout',
            ruta: `${this.rutaIconos}logout.svg`
        }
    ];
}