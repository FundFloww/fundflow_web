import { Component } from '@angular/core';
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

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [SideBarComponent, NgIf],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  open: boolean = true;
  session: boolean | null = null;
  usuario!: Usuario | null;
  usuarioTemporal!: Usuario | null;

  constructor(private usuariosService: UsuariosService) { }

  async ngOnInit() {
    this.session = await this.usuariosService.initializeSession();
    this.usuario = await this.usuariosService.getUsuario();
    this.usuarioTemporal = this.usuario;
    console.log(this.usuarioTemporal?.tipo);
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

  onFileSelected(evento: Event) {
    const inputElement = evento.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file && this.usuarioTemporal !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (this.usuarioTemporal) {
          this.usuarioTemporal.banner = imageUrl;
        }
      };
      reader.readAsDataURL(file);
    }
    console.log(this.usuarioTemporal);
  }
}
