import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { Idea } from '../interfaces/idea';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SideBarComponent, IdeaItemComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
    ideas: IdeaDto[] = [];

    constructor(private ideaService: IdeasServicioService) { }
    
    async ngOnInit() {
      try {
        this.ideas = await this.ideaService.getIdeas();
      } catch (error) {
        console.error("Ocurrió un error al obtener las ideas: ", error);
      }
    }

    // ngOnInit() {
    //   this.ideaService.getIdeas().then(ideas => {
    //     this.ideas = ideas;
    //   });
    // }
}
