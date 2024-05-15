import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IdeaDto } from '../../interfaces/ideaDto';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';

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
	@Output() ideaEliminada = new EventEmitter();

	constructor(
        private usuariosService: UsuariosService,
		private ideaService: IdeasServicioService
    ) { }

    async ngOnInit() {
        this.usuario = await this.usuariosService.getUsuarioPorId(this.idea.emprendedor[0].id ?? 0);
    }

	borrarIdea(id: number | undefined) {
        if (id !== undefined) {
            const resp = confirm("Seguro que quiere eliminar la idea con ID: " + id + "?");
            if (resp) {
                this.ideaService.deleteIdea(id).then(() => {
                    this.ideaEliminada.emit();
                });
            }
        }
    }

}
