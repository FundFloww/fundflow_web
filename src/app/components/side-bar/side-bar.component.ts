import { Component, Input } from '@angular/core';
import { SideBarElementoComponent } from '../side-bar-elemento/side-bar-elemento.component';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [SideBarElementoComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
    constructor(
        private usuarioService: UsuariosService,
        private router: Router
    ) {}

    @Input() session: boolean | null = null;
    @Input() open: boolean = false;

    timesLoaded = 0;

    rutaIconos = '../../assets/icons';
    elementos = [
        {
            id: 1,
            nombre: 'Inicio',
            icono: 'inicio',
            destino: '/',
            ruta: `${this.rutaIconos}/home.svg`
        },
        {
            id: 2,
            nombre: 'Noticias',
            icono: 'noticias',
            destino: '/noticias',
            ruta: `${this.rutaIconos}/noticias.svg`
        },
        {
            id: 3,
            nombre: 'Mis Ideas',
            icono: 'ideas',
            destino: '/perfil/0',
            ruta: `${this.rutaIconos}/emprendedor.svg`
        },
        {
            id: 4,
            nombre: 'Mis Inversiones',
            icono: 'inversiones',
            destino: '/perfil/0',
            ruta: `${this.rutaIconos}/inversor.svg`
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
            nombre: 'Guardados',
            icono: 'guardados',
            destino: '/perfil/0',
            ruta: `${this.rutaIconos}/guardados.svg`
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
            nombre: 'Iniciar sesión',
            icono: 'login',
            destino: '/login',
            ruta: `${this.rutaIconos}/login.svg`
        },
        {
            id: 9,
            nombre: 'Registrarse',
            icono: 'registro',
            destino: '/registro',
            ruta: `${this.rutaIconos}/register.svg`
        }, 
    ];

    onHomeClick() {
        this.router.navigate(['/']);
    }

    async ngOnChanges() {
        if(this.session != null) {
            this.validateSession();
            await this.validateTipoUsuario();
        }

        this.sideBarChange();
    }

    validateSession() {
        if(this.session) {
            this.elementos = this.elementos.filter(e => e.id < 8);
            return;
        }

        this.elementos = this.elementos.filter(e => e.id < 3 || e.id > 7);
    }

    async validateTipoUsuario() {
        const usuario: Usuario = await this.usuarioService.getUsuario();

        if(usuario.tipo[0] === 'INVERSOR') {
            this.elementos = this.elementos.filter(e => e.id !== 3 && e.id !== 5);
        }

        if(usuario.tipo[0] === 'EMPRENDEDOR') {
            this.elementos = this.elementos.filter(e => e.id !== 4 && e.id !== 5 && e.id !== 6);
        }

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