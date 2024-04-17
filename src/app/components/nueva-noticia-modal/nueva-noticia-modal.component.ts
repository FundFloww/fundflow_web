import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../interfaces/noticia';
import { NoticiasService } from '../../services/noticias/noticias.service';

@Component({
	selector: 'nueva-noticia-modal',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './nueva-noticia-modal.component.html',
	styleUrl: './nueva-noticia-modal.component.scss'
})
export class NuevaNoticiaModalComponent {
	newNoticia : Noticia = {
		titulo: '',
		link: '',
		descripcion: '',
		fecha: null
	};

	noticiaRegister: boolean = false;

	@Output() noticiaAgregada = new EventEmitter<boolean>();

    @ViewChild('registroForm') registroForm!: NgForm;

	constructor(private noticiasService: NoticiasService) { }

	async addNewNoticia() {
		this.newNoticia.fecha = new Date();
		this.noticiasService.addNoticia(this.newNoticia).then(response => {
            if (response) {
				this.noticiaRegister = response;
				this.noticiaAgregada.emit();
			}
		});
	}

	validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
        return {
            [validClass]: ngModel.touched && ngModel.valid,
            [errorClass]: ngModel.touched && ngModel.invalid
        };
    }

	resetForm() {
        if (this.registroForm) {
			this.noticiaRegister = false;
			this.newNoticia = {
				titulo: '',
				link: '',
				descripcion: '',
				fecha: null
			};
            this.registroForm.resetForm();
        }
    }
}
