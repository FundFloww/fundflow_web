import { Component } from '@angular/core';
import { IdeasServicioService } from '../sevicios/ideas-servicio.service';
import { Idea } from '../interfaces/idea';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-perfil-emprendedor',
  standalone: true,
  imports: [IdeaItemComponent, SideBarComponent],
  templateUrl: './perfil-emprendedor.component.html',
  styleUrl: './perfil-emprendedor.component.scss'
})

export class PerfilEmprendedorComponent {
  ideas: Idea[] = [];

  constructor(private ideaService: IdeasServicioService) { }
  
  ngOnInit() {
    this.ideaService.getIdeas().then(ideas => {
      this.ideas = ideas;
    });
  }
}
