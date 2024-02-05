import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { IdeasServicioService } from '../servicios/ideas-servicio.service';
import { Idea } from '../interfaces/idea';
import { camposKeys } from '../enum/campos';
import { IdeaItemComponent } from '../idea-item/idea-item.component';
import { IdeaDto } from '../interfaces/ideaDto';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [SideBarComponent, IdeaItemComponent],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss'
})
export class InicioComponent {
    ideas: IdeaDto[] = [];

    camposArray: string[] = camposKeys;
    open: boolean = true;

    constructor(private ideaService: IdeasServicioService) { }

    async ngOnInit() {
        try {
            this.ideas = await this.ideaService.getIdeas();
        } catch (error) {
            console.error("Ocurrió un error al obtener las ideas: ", error);
        }
    }

    onOpenBar() {
        this.open = !this.open;
        const sideBar = document.getElementById('side-bar')!;
        const content = document.getElementById('content')!;
        
        if(sideBar.classList.contains("col-2")) {
            sideBar.classList.remove("col-2");
            content.classList.remove("col-10");

            sideBar.classList.add("col-1-p");
            setTimeout(() => {
                content.classList.add("col-11-p");
            }, 350);
            return;
        }

        sideBar.classList.remove("col-1-p");
        content.classList.remove("col-11-p");

        sideBar.classList.add("col-2");
        content.classList.add("col-10");
        return;
    }
}
