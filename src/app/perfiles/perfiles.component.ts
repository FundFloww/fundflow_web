import { Component } from '@angular/core';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { UsuariosService } from '../servicios/usuarios.service';
import { Usuario } from '../interfaces/usuario';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  usuarioLogeado!: Usuario;
  usuario!: Usuario | null;
  tipo: TipoUsuario | undefined;
  id: number = 0;

  constructor(
      private ideaService: IdeasServicioService, 
      private usuariosService: UsuariosService,
      private route: ActivatedRoute,
      private router: Router
  ) {
    // this.route.paramMap.subscribe(params => {
    //     const idString = params.get('id');
    //     const nombre = params.get('nombre');
    //     if (idString) {
    //         this.id = parseInt(idString, 10);
    //     }
    // })
  }

  async ngOnInit() {
    this.session = await this.usuariosService.initializeSession();
    this.usuarioLogeado = await this.usuariosService.getUsuarioLogged();
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    })
    console.log(this.id);
    this.usuario = await this.usuariosService.getUsuario(this.id);
    this.ideas = await this.ideaService.getIdeasUser(this.id);
    console.log(this.usuario);
      // if (!this.usuario) {
      //   this.router.navigate(['/inicio']);
      // }
    this.tipo = this.usuario?.tipo;
  }

  onOpenBar() {
      this.open = onOpenBarFunction(this.open);
  }

//   cambiarTipo() {
//     if(this.tipo == TipoUsuario.Emprendedor) {
//         this.tipo = TipoUsuario.Inversor;
//     } else {
//         this.tipo = TipoUsuario.Emprendedor;
//     }
//   }
}