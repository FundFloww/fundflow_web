import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuarioZonaAdminDTO } from '../../interfaces/usuario-zona-admin-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioFilterPipe } from '../../pipes/usuario-filter.pipe';

@Component({
    selector: 'zona-admin-usuarios',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        UsuarioFilterPipe
    ],
    templateUrl: './zona-admin-usuarios.component.html',
    styleUrl: './zona-admin-usuarios.component.scss'
})
export class ZonaAdminUsuariosComponent {
    filterSearch = '';
    usuarios: UsuarioZonaAdminDTO[] = [];
    usuariosNotFound: boolean = false;

    constructor(
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        try {
            this.usuarios = await this.usuariosService.getUsuariosZonaAdmin();
            this.usuariosNotFound = (this.usuarios.length === 0) ? true : false;
        } catch (error) {
            console.error("Ocurrió un error al obtener los usuarios: ", error);
        }
    }
}
