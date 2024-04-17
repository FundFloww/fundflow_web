import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';

import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../interfaces/noticia';
import { NoticiasService } from '../../services/noticias/noticias.service';

@Component({
	selector: 'modificar-noticia-modal',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './modificar-noticia-modal.component.html',
	styleUrl: './modificar-noticia-modal.component.scss'
})
export class ModificarNoticiaModalComponent {

	@Input() noticia!: Noticia | null;
	@Output() noticiaModificada = new EventEmitter<boolean>();

	@ViewChild('editForm') editForm!: NgForm;

	noticiaTemporal: Noticia = {
		titulo: '',
		link: '',
		descripcion: '',
		fecha: null
	};

	cambio: boolean = false;

	constructor(private noticiasService: NoticiasService) { }

	ngOnChanges(changes: SimpleChanges): void {
        if (changes['noticia'] && this.noticia) {
            this.noticiaTemporal = Object.assign({}, this.noticia);
        }
    }

	async editNoticia(){
    
		this.noticiasService.editNoticia(this.noticiaTemporal).then(response => {

			if (!response) {
				this.noticiaModificada.emit();
                this.cambio = false;
			}
		});
    }

	cambioRealizado(){
        this.cambio = true;
    }

	resetForm() {
        if (this.editForm) {
            this.cambio = false;
        }
    }

	validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
    }
}
