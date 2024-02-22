import { Pipe, PipeTransform } from '@angular/core';
import { IdeaDto } from '../../interfaces/ideaDto';

@Pipe({
    name: 'ideaFilter',
    standalone: true
})
export class IdeasFilterPipe implements PipeTransform {

    transform(ideas: IdeaDto[], filterBy: string): IdeaDto[] {
        const filter = filterBy ? filterBy.toLowerCase() : null;  

        if (filter) {
            const filterId = parseInt(filter, 10);
            return ideas.filter(
                idea =>
                    idea.titulo.toLowerCase().includes(filter) ||
                    idea.descripcion.toLowerCase().includes(filter) ||
                    idea.campo.toLowerCase().includes(filter)
            );
        }
        return ideas;
    }

}
