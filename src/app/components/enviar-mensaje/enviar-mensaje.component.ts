import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { CorreoService } from '../../services/correo/correo.service';

@Component({
  selector: 'app-enviar-mensaje',
  standalone: true,
  templateUrl: './enviar-mensaje.component.html',
  styleUrl: './enviar-mensaje.component.scss',
  imports: [
    SideBarComponent,
    HeaderComponent,
    FormsModule,
    CommonModule
  ]
})
export class EnviarMensajeComponent {
  open: boolean = true;
  session: boolean | null = null;

  usuario: Usuario | undefined;
  idDestinatario: number | undefined;
  destinatario: string | undefined;
  asunto: string = '';
  contenido: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private correoService: CorreoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.idDestinatario = params['id'];
    })
    this.session = await this.usuariosService.initializeSession();
    this.usuario = await this.usuariosService.getUsuarioPorId(this.idDestinatario ?? 0);
  }

  async enviarCorreo() {
    this.destinatario = this.usuario?.correo;
    await this.correoService.enviarCorreo(this.destinatario ?? '', this.asunto, this.contenido);
    this.router.navigate(['/inicio']);
  }

  onOpenBar() {
    this.open = onOpenBarFunction(this.open);
  }
}
