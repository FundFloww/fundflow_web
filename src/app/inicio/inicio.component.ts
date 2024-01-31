import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { IdeasServicioService } from '../sevicios/ideas-servicio.service';
import { Idea } from '../interfaces/idea';
import { IdeaItemComponent } from '../idea-item/idea-item.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SideBarComponent, IdeaItemComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
    ideas: Idea[] = [];

    constructor(private ideaService: IdeasServicioService) { }
    
    ngOnInit() {
      this.ideaService.getIdeas().then(ideas => {
        this.ideas = ideas;
      });
    }
}
