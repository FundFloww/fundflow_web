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

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [SideBarComponent, NgIf],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {
  open: boolean = true;
  session: boolean | null = null;
  usuario!: Usuario | null;

  constructor(private usuariosService: UsuariosService) { }

  async ngOnInit() {
    this.session = await this.usuariosService.initializeSession();
    this.usuario = await this.usuariosService.getUsuario();
  }

  onOpenBar() {
    this.open = onOpenBarFunction(this.open);
  }
}
