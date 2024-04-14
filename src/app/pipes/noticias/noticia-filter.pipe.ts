import { Pipe, PipeTransform } from '@angular/core';
import { Noticia } from '../../interfaces/noticia';

@Pipe({
	name: 'noticiaFilter',
	standalone: true
})
export class NoticiaFilterPipe implements PipeTransform {

	transform(noticias: Noticia[], filterBy: string): Noticia[] {
		const filter = filterBy ? filterBy.toLowerCase() : null;

		if (filter) {
			const filterId = parseInt(filter, 10);
			return noticias.filter(
				noticias =>
					noticias.id === filterId ||
					noticias.titulo.toLowerCase().includes(filter) ||
					noticias.descripcion.toLowerCase().includes(filter) ||
					noticias.link.toLowerCase().includes(filter)
			);
		}
		return noticias;
	}

}
