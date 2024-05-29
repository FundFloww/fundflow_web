import { Component, Input } from '@angular/core';
import { SideBarElementoComponent } from '../side-bar-elemento/side-bar-elemento.component';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { ElementSideBar, elementsSideBar, UserType } from '../../utils/sidebar.utils';

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [SideBarElementoComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

    @Input() session: boolean | null = null;
    open: boolean = true;
    timesLoaded = 0;
    elementsSideBar: ElementSideBar[] = []

    constructor(
        private usuarioService: UsuariosService,
        private router: Router
    ) {}

    async ngOnChanges() {
        if(this.session != null) {
            this.validateSession();
        }

        this.sideBarChange();
    }

    onHomeClick() {
        this.router.navigate(['/']);
    }

    onOpenBar(event?: Event) {
        const target = event?.target as HTMLElement;
        const cerrarBar = document.getElementById('cerrar-bar')!;

        if(target !== cerrarBar.children[0]) {
            return;
        }
        
        if(getComputedStyle(cerrarBar).display === 'none') {
            return;
        }

        this.open = onOpenBarFunction(this.open);
    }

    async validateSession() {
        this.elementsSideBar = elementsSideBar.filter(e => e.userType === UserType.ALL);

        if(this.session) {
            const usuario: Usuario = await this.usuarioService.getUsuario();
            const userType = usuario.tipo[0] as UserType;
            this.validateTipoUsuario(userType);
            return;
        }

        this.elementsSideBar = [...this.elementsSideBar, ...elementsSideBar.filter(e => e.userType === UserType.ANONIMO)];
    }

    async validateTipoUsuario(userType: UserType) {
        const filteredElements = elementsSideBar.filter(e => e.userType === userType || e.userType === UserType.LOGEADO);
        this.elementsSideBar = [...this.elementsSideBar, ...filteredElements];
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