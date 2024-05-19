import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { IdeaEditarDto } from '../../interfaces/ideaEditarDto';
import { Campos, camposKeys } from '../../enum/campos';

@Component({
	selector: 'modificar-idea-modal',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './modificar-idea-modal.component.html',
	styleUrl: './modificar-idea-modal.component.scss'
})
export class ModificarIdeaModalComponent {

	@Input() idea!: IdeaEditarDto | null;
	@Output() ideaModificada = new EventEmitter();
	camposArray: string[] = camposKeys;
	imagenesFile: File[] = [new File([], '')];

	@ViewChild('editForm') editForm!: NgForm;

	cambio: boolean = false;

	constructor(private ideasService: IdeasServicioService) { }

	ideaTemporal: IdeaEditarDto = {
		titulo: '',
		descripcion: '',
		imagenes: [],
		campo: undefined
	};

	ngOnChanges(changes: SimpleChanges): void {
        if (changes['idea'] && this.idea && this.idea.titulo) {
            this.ideaTemporal = Object.assign({}, this.idea);
        }
    }

	async editIdea(){
    
		// this.ideasService.editIdea(this.ideaTemporal).then(response => {

		// 	if (!response) {
		// 		this.ideaModificada.emit();
		// 		this.cambio = false;
		// 	}
		// });
    }

	cambioRealizado(){
        this.cambio = true;
    }

	resetForm() {
        if (this.editForm) {
            this.cambio = false;
			this.imagenesFile = [new File([], '')];
			this.editForm.resetForm();
        }
    }

	validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
		return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
	}

	campoVacio() {
        return this.ideaTemporal.campo === undefined;
    }

	changeImage(fileInput: HTMLInputElement, index: number) {
        if (!fileInput.files || fileInput.files.length === 0) { return; }

		this.cambio = true;

        const file = fileInput.files[0];

        this.imagenesFile[index] = file;
    }

    agregarOtraImagen(evento: Event) {
        evento.preventDefault();
        if(this.imagenesFile.length >= 5) { 
            // mensaje de aviso
            return; 
        }
        this.imagenesFile.push(new File([], ''));
    }

	deleteImagen(index: number) {
		this.ideaTemporal.imagenes.splice(index, 1);
		this.cambio = true;
	}

	imagenesVacias() {
        return (this.ideaTemporal.imagenes.length) == 0 && (this.imagenesFile.length == 1 && this.imagenesFile[0].name == '');
    }

    borrarImagen(index: number) {
        // Eliminar imagen funciona pero la apariencia no es correcta, se muestra el nombre anterior
		const newImagesFile = this.imagenesFile.splice(index, 1);
        this.imagenesFile = newImagesFile;

        if(this.imagenesFile.length === 0) {
            this.imagenesFile.push(new File([], ''));
        }
    }
}
