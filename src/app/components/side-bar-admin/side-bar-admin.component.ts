import { Component, Input } from '@angular/core';
import { SideBarElementoComponent } from '../side-bar-elemento/side-bar-elemento.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-admin',
  standalone: true,
  imports: [SideBarElementoComponent],
  templateUrl: './side-bar-admin.component.html',
  styleUrl: './side-bar-admin.component.scss'
})
export class SideBarAdminComponent {
    constructor(private router: Router) {}

    @Input() session: boolean | null = null;
    @Input() open: boolean = false;

    timesLoaded = 0;

    rutaIconos = '../../assets/icons';
    elementos = [
        {
            id: 1,
            nombre: 'Usuarios',
            icono: 'usuarios',
            destino: '/',
            ruta: `${this.rutaIconos}/usuarios.svg`
        },
        {
            id: 2,
            nombre: 'Ideas',
            icono: 'ideas',
            destino: '/',
            ruta: `${this.rutaIconos}/ideas.svg`
        },
        {
            id: 3,
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
            this.elementos = this.elementos.filter(e => e.nombre !== "Iniciar sesión" && e.nombre !== "Registrarse");
            return;
        }

        this.elementos = this.elementos.filter(e => e.nombre !== "Cerrar sesión" && e.nombre !== "Añadir Idea");
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
