import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Idea } from '../interfaces/idea';
import { Campos, camposKeys } from '../enum/campos';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';

@Component({
  selector: 'app-form-idea',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './form-idea.component.html',
  styleUrl: './form-idea.component.scss'
})
export class FormIdeaComponent {

  camposArray: string[] = camposKeys;

  // mapa: Map<string, string> = mapaCampos;

  constructor(private ideasServicio: IdeasServicioService) { }

  nuevaIdea: Idea = {
    titulo: '',
    descripcion: '',
    imagenes: [''],
    campo: Campos.Otros,
    emprendedor: [],
    inversor: [],
  }

  
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.nuevaIdea.imagenes.push(reader.result as string);
    });
  }
  
  agregarOtraImagen(evento: Event) {
    evento.preventDefault();
    this.nuevaIdea.imagenes.push('');
  }

  async enviarIdea() {
    try {
      await this.ideasServicio.addIdea(this.nuevaIdea);
    } catch (error) {
      console.error(error);
    }
  }
}