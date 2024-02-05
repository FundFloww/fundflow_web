import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Idea } from '../interfaces/idea';
import { Campos, camposKeys } from '../enum/campos';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-idea',
  standalone: true,

  imports: [SideBarComponent, FormsModule],
  templateUrl: './form-idea.component.html',
  styleUrl: './form-idea.component.scss'
})
export class FormIdeaComponent {

  // @ViewChild('miFormulario') miFormulario!: NgForm;

  camposArray: string[] = camposKeys;

  // mapa: Map<string, string> = mapaCampos;

  constructor(private ideasServicio: IdeasServicioService, private router: Router) { }

  nuevaIdea: Idea = {
    titulo: '',
    descripcion: '',
    imagenes: [''],
    campo: undefined,
    emprendedor: [],
    inversor: [],
  }

  imagenesVacias() {
    return this.nuevaIdea.imagenes.length === 1 && this.nuevaIdea.imagenes[0] === '';
  }

  campoVacio() {
    return this.nuevaIdea.campo === undefined;
  }

  changeImage(fileInput: HTMLInputElement, index: number) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }

  const file = fileInput.files[0];
  
  this.nuevaIdea.imagenes[index] = URL.createObjectURL(file);
  // this.nuevaIdea.imagenes.push(URL.createObjectURL(file));
  }
  
  agregarOtraImagen(evento: Event) {
    evento.preventDefault();
    this.nuevaIdea.imagenes.push('');
  }

  borrarImagen(index: number) {
    let opcionEliminada: HTMLElement = document.getElementsByClassName("imagen")[index] as HTMLElement;
    console.log(opcionEliminada);
    opcionEliminada.style.display = "none";
    // this.nuevaIdea.imagenes = this.nuevaIdea.imagenes.filter((_, i) => i !== index);

    // console.log(this.nuevaIdea.imagenes[index]);
    // this.nuevaIdea.imagenes.splice(index, 1);
  }

  async enviarIdea() {
    console.log(this.nuevaIdea.imagenes);
    try {
      await this.ideasServicio.addIdea(this.nuevaIdea);
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error(error);
    }
  }
}