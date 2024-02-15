import { Idea } from '../../interfaces/idea';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Router } from '@angular/router';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { IdeaDto } from '../../interfaces/ideaDto';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
    selector: 'app-idea-item',
    standalone: true,
    imports: [],
    templateUrl: './idea-item.component.html',
    styleUrl: './idea-item.component.scss'
})
export class IdeaItemComponent {
    @Input() idea!: IdeaDto;
    @Input() index!: number;
    usuario: Usuario | null = null;

    constructor(
        private usuariosService: UsuariosService,
        private router: Router
    ) { }

    detallesIdea() {
        this.router.navigate(['/idea', this.idea.id]);
    }

    ideas: IdeaDto[] = [];

    async ngOnInit() {
        this.usuario = await this.usuariosService.getUsuarioPorId(this.idea.emprendedor[0].id ?? 0);
    }

    onClickProfile() {        
        const id = this.idea?.emprendedor[0].id;
        this.router.navigate(['/perfil', id]);
    }


    // agregarIdea() {
    //   this.ideaService.addIdea(this.idea);
    // }

    // truncateText(text: string, limit: number): string {
    //   return text.length > limit ? text.substring(0, limit) + '...': text;
    // }
}
