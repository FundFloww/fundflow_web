import { NgIf } from '@angular/common';
import { Component, ElementRef, SimpleChange, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioEditarDTO } from '../../interfaces/usuario-editarDto';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { ImagenesService } from '../../services/imagenes/imagenes.service';

@Component({
    selector: 'app-editar-perfil',
    standalone: true,
    imports: [SideBarComponent, NgIf, FormsModule],
    templateUrl: './editar-perfil.component.html',
    styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {
    @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

    open: boolean = true;
    session: boolean | null = null;
    usuario!: Usuario | null;
    usuarioTemporal: UsuarioEditarDTO = {
        nombre: '',
        apellidos: '',
        profesion: '',
        correo: '',
        descripcion: '',
        imagen: '',
        banner: '',
        // contrasena: '',
        // confirmarContrasena: '',
        tipo: '',
    };

    tipoUsuario: string = '';
    imagenPerfil: File = new File([""], "filename");
    imagenBanner: File = new File([""], "filename");

    constructor(
        private usuariosService: UsuariosService,
        private imagenesService: ImagenesService,
        private router: Router
    ) { }

    async ngOnInit() {
        this.session = await this.usuariosService.initializeSession();
        this.usuario = await this.usuariosService.getUsuario();
        this.usuarioTemporal.nombre = this.usuario?.nombre || '';
        this.usuarioTemporal.apellidos = this.usuario?.apellidos || '';
        this.usuarioTemporal.profesion = this.usuario?.profesion || '';
        this.usuarioTemporal.correo = this.usuario?.correo || '';
        this.usuarioTemporal.descripcion = this.usuario?.descripcion || '';
        this.usuarioTemporal.imagen = this.usuario?.imagen || 'https://png.pngtree.com/background/20230524/original/pngtree-sad-pictures-for-desktop-hd-backgrounds-picture-image_2705986.jpg';
        this.usuarioTemporal.banner = this.usuario?.banner || 'https://as2.ftcdn.net/v2/jpg/04/31/86/03/1000_F_431860321_8JEaSC9UvONsxTWzxy4SvnsJklPbO7RM.jpg';
        this.usuarioTemporal.tipo = this.usuario?.tipo || '';
        this.tipoUsuario = this.usuario?.tipo || '';
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes['tipoUsuario']) {
            this.usuarioTemporal.tipo = this.tipoUsuario;
        }
    }

    onOpenBar() {
        this.open = onOpenBarFunction(this.open);
    }

    openFileInput() {
        console.log("hola");
        if (this.fileInputRef?.nativeElement) {
            this.fileInputRef.nativeElement.click();
        }
    }

    onFileSelected(evento: Event, foto: string) {
        const inputElement = evento.target as HTMLInputElement;
        const file = inputElement.files?.[0]!;

        if (file && this.usuarioTemporal !== null) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            if (this.usuarioTemporal) {
              if (foto === 'banner') {
                this.usuarioTemporal.banner = imageUrl;
              } else if (foto === 'perfil') {
                this.usuarioTemporal.imagen = imageUrl;
              }
            }
          };
          reader.readAsDataURL(file);
        }
        
        if (foto === 'banner') {
            this.imagenBanner = file;
            return;
        }

        this.imagenPerfil = file;
        return;
    }

    // contraseñasCoinciden() {
    //   return this.usuarioTemporal.contrasena === this.usuarioTemporal.contrasena;
    // }

    async enviarPerfil() {
        try {
            // if(this.usuarioTemporal.contrasena === '') {
            //   this.usuarioTemporal.contrasena = this.usuario?.contraseña || '';
            //   this.usuarioTemporal.confirmarContrasena = this.usuario?.contraseña || '';
            // }

            this.usuarioTemporal.imagen = await this.validarYSubirImagenes(this.imagenPerfil, this.usuarioTemporal.imagen);
            this.usuarioTemporal.banner = await this.validarYSubirImagenes(this.imagenBanner, this.usuarioTemporal.banner);

            if (Array.isArray(this.usuarioTemporal.tipo)) {
                this.usuarioTemporal.tipo = this.usuarioTemporal.tipo.toString();
            }

            await this.usuariosService.editUsuario(this.usuarioTemporal);
            this.router.navigate(['/perfil']);
        } catch (error) {
            console.error(error);
        }
    }

    private async validarYSubirImagenes(imagenNueva: File, imagenAntigua: string) {
        if (imagenAntigua !== imagenNueva.name && imagenNueva.name !== 'filename') {
            const url = await this.imagenesService.subirImagenes([imagenNueva]);
            return url[0];
        }

        return imagenAntigua;
    }
}
