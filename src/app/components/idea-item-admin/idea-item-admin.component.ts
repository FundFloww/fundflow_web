import { Component, Input } from '@angular/core';
import { IdeaDto } from '../../interfaces/ideaDto';
import { Usuario } from '../../interfaces/usuario';

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

}
