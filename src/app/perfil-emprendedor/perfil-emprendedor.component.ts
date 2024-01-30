import { Component } from '@angular/core';
import { IdeasServicioService } from '../sevicios/ideas-servicio.service';
import { Idea } from '../interfaces/idea';
import { IdeaItemComponent } from '../idea-item/idea-item.component';

@Component({
  selector: 'app-perfil-emprendedor',
  standalone: true,
  imports: [IdeaItemComponent],
  templateUrl: './perfil-emprendedor.component.html',
  styleUrl: './perfil-emprendedor.component.scss'
})

export class PerfilEmprendedorComponent {
  ideas: Idea[] = [];

  constructor(private ideaService: IdeasServicioService) { }
  
  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
  }
}
