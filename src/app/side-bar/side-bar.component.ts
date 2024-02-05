import { Component, Input, SimpleChanges } from '@angular/core';
import { SideBarElementoComponent } from '../side-bar-elemento/side-bar-elemento.component';

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [SideBarElementoComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
    @Input() open: boolean = true;

    rutaIconos = '../../assets/icons';
    elementos = [
        {
            id: 1,
            nombre: 'Inicio',
            icono: 'home',
            destino: '/',
            ruta: `${this.rutaIconos}/home.svg`
        },
        {
            id: 2,
            nombre: 'Configuración',
            icono: 'settings',
            destino: '/',
            ruta: `${this.rutaIconos}/settings.svg`
        },
        {
            id: 3,
            nombre: 'Ayuda',
            icono: 'help',
            destino: '/',
            ruta: `${this.rutaIconos}/help.svg`
        },
        {
            id: 4,
            nombre: 'Añadir Idea',
            icono: 'añadir',
            destino: '/idea/anadir',
            ruta: `${this.rutaIconos}/añadir.svg`
        },
        {
            id: 5,
            nombre: 'Iniciar sesión',
            icono: 'login',
            destino: '/login',
            ruta: `${this.rutaIconos}/login.svg`
        },
        {
            id: 6,
            nombre: 'Cerrar sesión',
            icono: 'logout',
            destino: '/logout',
            ruta: `${this.rutaIconos}/logout.svg`
        
        }
    ];

    onHomeClick() {
        window.location.href = '/';
    }

    ngOnChanges(changes: SimpleChanges) {
        const sideBar = document.getElementById('sidebar-content')!;    
        
        if(!changes['open'].currentValue) {
            sideBar.classList.add("small-bar");
            return;
        }

        sideBar.classList.remove("small-bar");
    }
}