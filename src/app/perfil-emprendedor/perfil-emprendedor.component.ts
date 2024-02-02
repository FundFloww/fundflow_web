import { Component } from '@angular/core';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { Idea } from '../interfaces/idea';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { IdeaDto } from '../interfaces/ideaDto';

@Component({
  selector: 'app-perfil-emprendedor',
  standalone: true,
  imports: [IdeaItemComponent, SideBarComponent],
  templateUrl: './perfil-emprendedor.component.html',
  styleUrl: './perfil-emprendedor.component.scss'
})

export class PerfilEmprendedorComponent {
  ideas: IdeaDto[] = [];

  constructor(private ideaService: IdeasServicioService) { }
  
  async ngOnInit() {
    try {
      this.ideas = await this.ideaService.getIdeas();
    } catch (error) {
      console.error("Ocurrió un error al obtener las ideas: ", error);
    }
  }

  // async ngOnInit() {
  //   this.ideaService.getIdeas().then(ideas => {
  //     this.ideas = ideas;
  //   });
  // }
}
