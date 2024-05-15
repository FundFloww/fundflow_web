import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuarioZonaAdminDTO } from '../../interfaces/usuario-zona-admin-dto';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { UsuarioFilterPipe } from '../../pipes/usuario/usuario-filter.pipe';
import { UsuarioRegistroDTO } from '../../interfaces/usuario-registro-dto';
import { NuevoUsuarioModalComponent } from '../../components/nuevo-usuario-modal/nuevo-usuario-modal.component';
import { ModificarUsuarioModalComponent } from '../../components/modificar-usuario-modal/modificar-usuario-modal.component';
import { Usuario } from '../../interfaces/usuario';
import { TipoUsuario } from '../../enum/tipo-usuario';

@Component({
    selector: 'zona-admin-usuarios',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        UsuarioFilterPipe,
        NuevoUsuarioModalComponent,
        ModificarUsuarioModalComponent
    ],
    templateUrl: './zona-admin-usuarios.component.html',
    styleUrl: './zona-admin-usuarios.component.scss'
})
export class ZonaAdminUsuariosComponent {
    filterSearch = '';
    usuarios: UsuarioZonaAdminDTO[] = [];
    usuariosNotFound: boolean = false;
    currentPage: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    registrosTotales: number = 0;

    usuario: Usuario = {
        nombre: '',
        apellidos: '',
        correo: '',
        contraseña: '',
        imagen: '',
        banner: '',
        descripcion: '',
        profesion: '',
        tipo: TipoUsuario.Emprendedor,
        ideas: [],
        guardados: [],
        inversiones: []

    };

    constructor(
        private usuariosService: UsuariosService
    ) { }

    ngOnInit() {
        this.cargarUsuarios();
    }

    async cargarUsuarios() {
        try {
            const res = await this.usuariosService.getUsuariosZonaAdmin(this.currentPage, this.pageSize);
            if (res != null) {
                this.usuarios = res.content;
                this.totalPages = res.totalPages;
                this.currentPage = res.pageable.pageNumber;
                this.registrosTotales = res.totalElements;
            }
            this.updateUsuariosNotFound();

        } catch (error) {
            console.error("Ocurrió un error al obtener los usuarios: ", error);
        }
    }

    updateUsuariosNotFound() {
        this.usuariosNotFound = (this.usuarios.length === 0);
    }

    async cambiarPagina(pagina: number) {
        if (pagina >= 0 && pagina < this.totalPages) {
            this.currentPage = pagina;
            await this.cargarUsuarios();
        }
    }

    actualizarPageSize() {
        if (this.pageSize >= this.registrosTotales) {
            this.currentPage = 0;
        }
        this.cargarUsuarios();
    }

    async obtenerUsuarioAModificar(id: number | undefined) {
        if (id != null) {
            this.usuario = await this.usuariosService.getUsuarioPorId(id);
        }
    }

    borrarUsuario(id: number | undefined) {
        if (id !== undefined) {
            const resp = confirm("Seguro que quiere eliminar el usuario con ID: " + id + "?");
            if(resp){
                this.usuariosService.deleteUsuario(id).then(() => {
                    if(this.usuarios.length == 1) {
                        this.usuarios = [];
                        this.updateUsuariosNotFound();
                    } else {
                        this.cargarUsuarios();
                    }
                });
            }
        }
    }

    cargarModificaciones() {
        this.cargarUsuarios();
    }



}
