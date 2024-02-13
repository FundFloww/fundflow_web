import { Component, SimpleChange } from '@angular/core';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UsuariosService } from '../servicios/usuarios.service';
import { Usuario } from '../interfaces/usuario';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TipoUsuario } from '../enum/tipo-usuario';
import { ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioEditarDTO } from '../interfaces/usuario-editarDto';
import { UsuarioEditarContraseñaDTO } from '../interfaces/usuario-editar-contraseñaDTO';

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
    tipo: '',
  };
  tipoUsuario: string = '';
  usuarioEditarContrasena: UsuarioEditarContraseñaDTO = {
    correo: '',
    nuevaContrasena: '',
    confirmarContrasena:  '',
  }

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  async ngOnInit() {
    this.session = await this.usuariosService.initializeSession();
    this.usuario = await this.usuariosService.getUsuarioLogged();
    this.usuarioTemporal.nombre = this.usuario?.nombre || '';
    this.usuarioTemporal.apellidos = this.usuario?.apellidos || '';
    this.usuarioTemporal.profesion = this.usuario?.profesion || '';
    this.usuarioTemporal.correo = this.usuario?.correo || '';
    this.usuarioTemporal.descripcion = this.usuario?.descripcion || '';
    this.usuarioTemporal.imagen = this.usuario?.imagen || 'https://png.pngtree.com/background/20230524/original/pngtree-sad-pictures-for-desktop-hd-backgrounds-picture-image_2705986.jpg';
    this.usuarioTemporal.banner = this.usuario?.banner || 'https://as2.ftcdn.net/v2/jpg/04/31/86/03/1000_F_431860321_8JEaSC9UvONsxTWzxy4SvnsJklPbO7RM.jpg';
    this.usuarioTemporal.tipo = this.usuario?.tipo || '';
    this.tipoUsuario = this.usuario?.tipo || '';

    this.usuarioEditarContrasena.correo = this.usuario?.correo || '';
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange}) {
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
    const file = inputElement.files?.[0];
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
  }
  
  contrasenasCoinciden() {
    return this.usuarioEditarContrasena.nuevaContrasena === this.usuarioEditarContrasena.confirmarContrasena;
  }
  
  async enviarPerfil() {
    try {
      // if(this.usuarioTemporal.contrasena === '') {
      //   this.usuarioTemporal.contrasena = this.usuario?.contraseña || '';
      //   this.usuarioTemporal.confirmarContrasena = this.usuario?.contraseña || '';
      // }
      await this.usuariosService.editUsuario(this.usuarioTemporal);
      this.router.navigate(['/perfil']);
    } catch (error) {
      console.error(error);
    }
  }

  async enviarContrasena() {
    try {
      await this.usuariosService.editContrasena(this.usuarioEditarContrasena)
      this.router.navigate(['/perfil']);
    } catch (error) {
      console.error(error);
    }
  }
}
