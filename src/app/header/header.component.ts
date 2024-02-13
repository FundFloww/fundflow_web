import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  session: boolean | null = null;
  usuarioLogged!: Usuario | null;
  nombreUsuarioLogged: string = '';

  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.session = await this.usuarioService.loggedIn();
    this.usuarioLogged = await this.usuarioService.getUsuarioLogged();
    // let nombre = this.usuario?.nombre.replace(/\s+/g, '') ?? '';
    // let apellidos = this.usuario?.apellidos.replace(/\s+/g, '') ?? '';
    // this.nombreUsuarioLogged = nombre + apellidos;
    this.nombreUsuarioLogged = this.formatearNombre(this.usuarioLogged?.nombre ?? '', this.usuarioLogged?.apellidos ?? '');
  }

  enviarParametros(nombre: string, apellidos: string, id: number) {
    console.log(nombre);
    console.log(apellidos);
    console.log(id);
    let nombreCompleto = this.formatearNombre(nombre, apellidos);
    this.router.navigate(['/perfil'], { queryParams: { nombreCompleto, id } })
  }

  // navegarAPerfil(usuario: Usuario) {
  //   const url = `/perfil/${usuario.id}${this.formatearNombre(usuario.nombre + usuario.apellidos)}`;
  //   this.router.navigate([url]);
  // }

  formatearNombre(nombre: string, apellidos: string): string {
    let nombreAux = nombre.replace(/\s+/g, '');
    let apellidosAux = apellidos.replace(/\s+/g, '');
    let nombreUsuario = nombreAux + apellidosAux;
    return nombreUsuario;
  }

}
