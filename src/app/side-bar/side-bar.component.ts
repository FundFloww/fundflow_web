import { Component, Input } from '@angular/core';
import { SideBarElementoComponent } from '../side-bar-elemento/side-bar-elemento.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [SideBarElementoComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
    constructor(private router: Router) {}

    @Input() session: boolean | null = null;
    @Input() open: boolean = false;

    timesLoaded = 0;

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
        this.router.navigate(['/']);
    }

    ngOnChanges() {
        if(this.session != null) this.validateSession();
        this.sideBarChange();
    }

    validateSession() {
        if(this.session) {
            this.elementos = this.elementos.filter(e => e.nombre !== "Iniciar sesión");
            return;
        }

        this.elementos = this.elementos.filter(e => e.nombre !== "Cerrar sesión");
    }

    sideBarChange() {
        const sideBar = document.getElementById('sidebar-content')!;
        
        if(!this.open) {
            sideBar.classList.add("small-bar");
            return;
        }

        sideBar.classList.remove("small-bar");
    }
}