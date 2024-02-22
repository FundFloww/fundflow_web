import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioEditarDTO } from '../../interfaces/usuario-editarDto';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, NgIf, FormsModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    @Input() filterIdeas!: string;
    @Output() filterIdeasChange: EventEmitter<string> = new EventEmitter<string>();

    session: boolean | null = null;
    usuario!: UsuarioEditarDTO;
    idUsuarioIdentificado: number | undefined;

    constructor(
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        this.session = await this.usuariosService.loggedIn();

        if(this.session) {
            this.idUsuarioIdentificado = Number(this.usuariosService.getUserId());
            this.usuario = await this.usuariosService.getUsuarioPorId(this.idUsuarioIdentificado);
        }
    }

    onFilterChange(event: any) {
      this.filterIdeasChange.emit(event.target.value);
    }
}
