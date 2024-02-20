import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { camposKeys } from '../../enum/campos';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { IdeaNueva } from '../../interfaces/ideaNueva';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { ImagenesService } from '../../services/imagenes/imagenes.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

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
    enviandoIdea: boolean = false;

    constructor(
        private usuariosService: UsuariosService,
        private ideasServicio: IdeasServicioService,
        private imagenesService: ImagenesService,
        private router: Router
    ) { }

    nuevaIdea: IdeaNueva = {
        titulo: '',
        descripcion: '',
        imagenes: [],
        imagenesFile: [new File([], '')],
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

        this.nuevaIdea.imagenesFile[index] = file;
    }

    agregarOtraImagen(evento: Event) {
        evento.preventDefault();
        if(this.nuevaIdea.imagenesFile.length >= 5) { 
            // mensaje de aviso
            return; 
        }
        this.nuevaIdea.imagenesFile.push(new File([], ''));
    }

    borrarImagen(index: number) {
        // Eliminar imagen funciona pero la apariencia no es correcta, se muestra el nombre anterior
        const newImagesFile = this.nuevaIdea.imagenesFile.filter((_, i) => i !== index);
        this.nuevaIdea.imagenesFile = newImagesFile;

        if(this.nuevaIdea.imagenesFile.length === 0) {
            this.nuevaIdea.imagenesFile.push(new File([], ''));
        }
        console.log(this.nuevaIdea.imagenesFile);
    }


    async enviarIdea() {
        try {
            this.enviandoIdea = true;
            this.nuevaIdea.imagenes = await this.imagenesService.subirImagenes(this.nuevaIdea.imagenesFile);
            this.nuevaIdea.emprendedor.push(await this.usuariosService.getUsuario());
            await this.ideasServicio.addIdea(this.nuevaIdea);
            this.router.navigate(['/inicio']);
        } catch (error) {
            console.error(error);
        } finally {
            this.enviandoIdea = false;
        }
    }

    onOpenBar(evento?: Event) {
        const cerrarBar = document.getElementById('cerrar-bar')!;

        if(evento?.target !== cerrarBar.children[0]) {
            return;
        }
        
        if(getComputedStyle(cerrarBar).display === 'none') {
            return;
        }

        this.open = onOpenBarFunction(this.open);
    }

    validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
    }
}