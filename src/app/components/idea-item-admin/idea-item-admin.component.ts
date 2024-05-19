import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IdeaDto } from '../../interfaces/ideaDto';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { ModificarIdeaModalComponent } from '../modificar-idea-modal/modificar-idea-modal.component';
import { IdeaEditarDto } from '../../interfaces/ideaEditarDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'idea-item-admin',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule
    ],
    templateUrl: './idea-item-admin.component.html',
    styleUrl: './idea-item-admin.component.scss'
})
export class IdeaItemAdminComponent {

    @Input() idea!: IdeaDto;
    usuario: Usuario | null = null;
    @Output() ideaEliminada = new EventEmitter();
    @Output() ideaAModificar = new EventEmitter<IdeaEditarDto>();

    ideaEditar: IdeaEditarDto | null = null;

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

    async obtenerIdeaAModificar(id: number | undefined) {
        if (id != null) {
            this.ideaEditar = await this.ideaService.getIdeaPorId(id);
            if(this.ideaEditar) {
                this.ideaAModificar.emit(this.ideaEditar);
            }
        }
    }

}
