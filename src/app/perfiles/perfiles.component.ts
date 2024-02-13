import { Component } from '@angular/core';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
import { IdeaItemComponent } from '../components/idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../services/ideas/ideas-servicio.service';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { Usuario } from '../interfaces/usuario';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PerfilEmprendedorComponent } from './perfil-emprendedor/perfil-emprendedor.component';
import { PerfilInversorComponent } from './perfil-inversor/perfil-inversor.component';
import { TipoUsuario } from '../enum/tipo-usuario';

@Component({
    selector: 'app-perfiles',
    standalone: true,
    templateUrl: './perfiles.component.html',
    styleUrl: './perfiles.component.scss',
    imports: [SideBarComponent, IdeaItemComponent, NgIf, PerfilEmprendedorComponent, PerfilInversorComponent]
})
export class PerfilesComponent {
  ideas: IdeaDto[] = [];
  open: boolean = true;
  session: boolean | null = null;
  usuario!: Usuario | null;
  tipo: TipoUsuario | undefined;

  constructor(
      private ideaService: IdeasServicioService, 
      private usuariosService: UsuariosService
  ) { }

  async ngOnInit() {
      this.ideas = await this.ideaService.getIdeasUser();
      this.session = await this.usuariosService.initializeSession();
      this.usuario = await this.usuariosService.getUsuario();
  }

  onOpenBar() {
    const cerrarBar = document.getElementById('cerrar-bar')!; 
        
    if(getComputedStyle(cerrarBar).display === 'none') {
        return;
    }
      this.open = onOpenBarFunction(this.open);
  }

  cambiarTipo() {
    if(this.tipo == TipoUsuario.Emprendedor) {
        this.tipo = TipoUsuario.Inversor;
    } else {
        this.tipo = TipoUsuario.Emprendedor;
    }
  }
}