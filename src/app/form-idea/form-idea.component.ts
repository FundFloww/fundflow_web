import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { camposKeys } from '../enum/campos';
import { onOpenBarFunction } from '../functions/sideBarFunctions';
import { HeaderComponent } from '../header/header.component';
import { IdeaNueva } from '../interfaces/ideaNueva';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
    selector: 'app-form-idea',
    standalone: true,
    imports: [
        SideBarComponent,
        FormsModule,
        HeaderComponent,
        CommonModule
    ],
    templateUrl: './form-idea.component.html',
    styleUrl: './form-idea.component.scss'
})
export class FormIdeaComponent {
    open: boolean = true;
    session: boolean | null = null;
    camposArray: string[] = camposKeys;

    constructor(
        private usuariosService: UsuariosService,
        private ideasServicio: IdeasServicioService,
        private router: Router
    ) { }

    nuevaIdea: IdeaNueva = {
        titulo: '',
        descripcion: '',
        imagenes: [],
        campo: undefined,
        emprendedor: [],
    }

    async ngOnInit() {
        this.session = await this.usuariosService.initializeSession();
    }

    imagenesVacias() {
        return this.nuevaIdea.imagenes.length === 1 && this.nuevaIdea.imagenes[0] === null;
    }

    campoVacio() {
        return this.nuevaIdea.campo === undefined;
    }

    changeImage(fileInput: HTMLInputElement, index: number) {
        if (!fileInput.files || fileInput.files.length === 0) { return; }

        const file = fileInput.files[0];

        this.nuevaIdea.imagenes[index] = file;
    }

    agregarOtraImagen(evento: Event) {
        evento.preventDefault();
        this.nuevaIdea.imagenes.push(new File([], ''));
    }

    borrarImagen(index: number) {
        let opcionEliminada: HTMLElement = document.getElementsByClassName("imagen")[index] as HTMLElement;
        console.log(opcionEliminada);
        opcionEliminada.style.display = "none";
        this.nuevaIdea.imagenes = this.nuevaIdea.imagenes.filter((_, i) => i !== index);

        // console.log(this.nuevaIdea.imagenes[index]);
        // this.nuevaIdea.imagenes.splice(index, 1);
    }


    async enviarIdea() {
        try {
            const urls = await this.subirImagenes();
            // this.nuevaIdea.emprendedor.push(await this.usuariosService.getUsuario());
            // console.log(this.nuevaIdea);
            // await this.ideasServicio.addIdea(this.nuevaIdea);
            // this.router.navigate(['/inicio']);
        } catch (error) {
            console.error(error);
        }
    }

    onOpenBar() {
        this.open = onOpenBarFunction(this.open);
    }

    async subirImagenes() {
        const urls: string[] = [];
        const baseURL = 'https://fundflow.blob.core.windows.net/ideas/';

        this.nuevaIdea.imagenes.forEach(async (imagen) => {
            const formData = new FormData();
            formData.append('imagen', imagen);
    
            await fetch('http://localhost:9000/api/blob/upload', {
                method: 'POST',
                body: formData
            });
            
            urls.push(baseURL + imagen.name);
        });

        return urls;
    }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
    }
}