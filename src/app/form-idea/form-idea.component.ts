import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Idea } from '../interfaces/idea';
import { Campos, camposKeys } from '../enum/campos';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
import { HeaderComponent } from '../header/header.component';
import { IdeaNueva } from '../interfaces/ideaNueva';

@Component({
  selector: 'app-form-idea',
  standalone: true,

  imports: [SideBarComponent, FormsModule, HeaderComponent],
  templateUrl: './form-idea.component.html',
  styleUrl: './form-idea.component.scss'
})
export class FormIdeaComponent {
    open: boolean = true;
    session: boolean | null = null;
    camposArray: string[] = camposKeys;

  constructor(private usuariosService: UsuariosService, private ideasServicio: IdeasServicioService, private router: Router) { }

  nuevaIdea: IdeaNueva = {
    titulo: '',
    descripcion: '',
    imagenes: [''],
    campo: undefined,
    id_emprendedor: null,
  }

  async ngOnInit() {

    this.session = await this.usuariosService.loggedIn();
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
    try {
      // this.nuevaIdea.emprendedor.push(await this.usuariosService.getUsuario());
      let id_emprendedor = this.usuariosService.getUserId();
      this.nuevaIdea.id_emprendedor = id_emprendedor;
      await this.ideasServicio.addIdea(this.nuevaIdea);
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error(error);
    }
  }

  onOpenBar() {
    this.open = onOpenBarFunction(this.open);
  }
}