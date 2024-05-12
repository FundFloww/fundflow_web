import { Component, Input } from '@angular/core';
import { IdeaDto } from '../../interfaces/ideaDto';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
	selector: 'idea-item-admin',
	standalone: true,
	imports: [],
	templateUrl: './idea-item-admin.component.html',
	styleUrl: './idea-item-admin.component.scss'
})
export class IdeaItemAdminComponent {

	@Input() idea!: IdeaDto;
	usuario: Usuario | null = null;

	constructor(
        private usuariosService: UsuariosService
    ) { }

    async ngOnInit() {
        this.usuario = await this.usuariosService.getUsuarioPorId(this.idea.emprendedor[0].id ?? 0);
    }

}
