import { Component } from '@angular/core';
import { IdeaDto } from '../../interfaces/ideaDto';
import { HeaderComponent } from '../../components/header/header.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { onOpenBarFunction } from '../../functions/sideBarFunctions';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { IdeasServicioService } from '../../services/ideas/ideas-servicio.service';
import { Router } from '@angular/router';
import { Idea } from '../../interfaces/idea';
import { UsuarioDatos } from '../../interfaces/UsuarioDatos';
import { InversionEnviar } from '../../interfaces/InversionEnviar';

@Component({
    selector: 'app-invertir',
    standalone: true,
    imports: [HeaderComponent, SideBarComponent],
    templateUrl: './invertir.component.html',
    styleUrl: './invertir.component.scss'
})
export class InvertirComponent {

    constructor(
        private usuariosService: UsuariosService,
        private ideasService: IdeasServicioService,
        private router: Router
    ) { }

    idea: Idea | null = null;
    open: boolean = true;
    session: boolean | null = null;
    usuario: UsuarioDatos | null = null;
    tab: number = 1;
    cantidad: number = 10;
    inversion: InversionEnviar | null = null;

    async ngOnInit() {
        this.session = await this.usuariosService.initializeSession();
        this.usuario = await this.usuariosService.getUsuario();     
        const idIdea = parseInt(this.router.url.split('/')[2]);
        const ideas = await this.ideasService.getIdeasAll();
        this.idea = ideas.find(idea => idea.id === idIdea) || null;

        this.initInvertir();
    }

    onOpenBar() {
        const cerrarBar = document.getElementById('cerrar-bar')!;

        if (getComputedStyle(cerrarBar).display === 'none') {
            return;
        }

        this.open = onOpenBarFunction(this.open);
    }

    getTabs() {
        const pago = document.getElementById('pago')!;
        const datos = document.getElementById('datos')!;
        const cantidad = document.getElementById('cantidad')!;

        return {
            pago,
            datos,
            cantidad
        };
    }

    initInvertir() {
        const pasoInicial = document.querySelector('.paso:first-child')!;
        const tabs = this.getTabs();

        tabs.cantidad.classList.add('active');
        pasoInicial.classList.add('paso-active');
    }

    onClickCantidad() {
        this.tab = 1;
        const tabs = this.getTabs();
        const target = document.getElementsByClassName('paso')[0] as HTMLElement;
        const pasos = document.querySelectorAll('.paso');

        pasos.forEach(paso => {
            paso.classList.remove('paso-active');
        });

        target.classList.add('paso-active');
        
        tabs.cantidad.classList.add('active');
        tabs.datos.classList.remove('active');
        tabs.pago.classList.remove('active');
    }
    
    onClickDatos() {
        this.tab = 2;
        const tabs = this.getTabs();
        const target = document.getElementsByClassName('paso')[1] as HTMLElement;
        const pasos = document.querySelectorAll('.paso');

        pasos.forEach(paso => {
            paso.classList.remove('paso-active');
        });

        target.classList.add('paso-active');

        tabs.cantidad.classList.remove('active');
        tabs.datos.classList.add('active');
        tabs.pago.classList.remove('active');
    }

    onClickPago() {
        this.tab = 3;
        const tabs = this.getTabs();
        const target = document.getElementsByClassName('paso')[2] as HTMLElement;
        const pasos = document.querySelectorAll('.paso');

        pasos.forEach(paso => {
            paso.classList.remove('paso-active');
        });

        target.classList.add('paso-active');

        tabs.cantidad.classList.remove('active');
        tabs.datos.classList.remove('active');
        tabs.pago.classList.add('active');
    }

    onSliderInput(evento: Event) {
        const target = evento.currentTarget as HTMLInputElement;
        const cantidad = document.getElementById('moneyValue')! as HTMLInputElement;

        cantidad.value = target.value + '€';
        this.cantidad = parseInt(cantidad.value);  
    }

    onCantidadInput() {
        const cantidad = document.getElementById('moneyValue')! as HTMLInputElement;
        const slider = document.getElementById('moneyRange')! as HTMLInputElement;

        cantidad.value = cantidad.value.replace('€', '');
        slider.value = cantidad.value;
        this.cantidad = parseInt(cantidad.value);
    }

    onSiguienteClick() {   
        this.tab++;
        if(this.tab === 1) {
            this.onClickDatos();
        }
        
        if(this.tab === 2) {
            this.onClickDatos();
        }
        
        if(this.tab === 3) {
            this.onClickPago();
        }
    }

    onInvertirClick(evento: Event) {
        evento.preventDefault();

        this.inversion = {
            cantidad: this.cantidad,
            fecha: new Date(),
            inversores: [this.usuario!],
            idea: this.idea!
        };
        console.log(this.inversion);
        
        this.ideasService.invertir(this.inversion);
        this.router.navigate(['/idea/' + this.idea!.id]);
    }
}
