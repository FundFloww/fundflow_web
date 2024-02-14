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
            nombre: 'Ajustes',
            icono: 'settings',
            destino: '/',
            ruta: `${this.rutaIconos}/settings.svg`
        },
        {
            id: 3,
            nombre: 'Noticias',
            icono: 'Noticias',
            destino: '/noticias',
            ruta: `${this.rutaIconos}/noticias.svg`
        },
        {
            id: 4,
            nombre: 'Ayuda',
            icono: 'help',
            destino: '/',
            ruta: `${this.rutaIconos}/help.svg`
        },
        {
            id: 5,
            nombre: 'Crear Idea',
            icono: 'añadir',
            destino: '/idea/añadir',
            ruta: `${this.rutaIconos}/añadir.svg`
        },
        {
            id: 6,
            nombre: 'Iniciar sesión',
            icono: 'login',
            destino: '/login',
            ruta: `${this.rutaIconos}/login.svg`
        },
        {
            id: 7,
            nombre: 'Cerrar Sesión',
            icono: 'logout',
            destino: '/logout',
            ruta: `${this.rutaIconos}/logout.svg`
        
        },
        {
            id: 8,
            nombre: 'Registrarse',
            icono: 'registro',
            destino: '/registro',
            ruta: `${this.rutaIconos}/register.svg`
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
            this.elementos = this.elementos.filter(e => e.id !== 6 && e.id !== 8);
            return;
        }

        this.elementos = this.elementos.filter(e => e.id !== 7 && e.id !== 5);
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