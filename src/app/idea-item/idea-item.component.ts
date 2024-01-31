import { Idea } from '../interfaces/idea';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Router } from '@angular/router';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';

@Component({
  selector: 'app-idea-item',
  standalone: true,
  imports: [],
  templateUrl: './idea-item.component.html',
  styleUrl: './idea-item.component.scss'
})
export class IdeaItemComponent {
  @Input() idea!: Idea;
  @Input() index!: number;

  constructor(private router: Router) { }

  detallesIdea() {
    const ideaId = this.idea.id;

    this.router.navigate(['/idea', ideaId]);
  }

  ideas: Idea[] = [];


  // agregarIdea() {
  //   this.ideaService.addIdea(this.idea);
  // }

  // truncateText(text: string, limit: number): string {
  //   return text.length > limit ? text.substring(0, limit) + '...': text;
  // }
}
