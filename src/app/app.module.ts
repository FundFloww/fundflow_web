import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IdeasServicioService } from './services/ideas/ideas-servicio.service';
import { UsuarioFilterPipe } from './pipes/usuario-filter.pipe';

@NgModule({
    declarations: [UsuarioFilterPipe],
    imports: [BrowserModule],
    exports: [],
    providers: [IdeasServicioService],
    bootstrap: []
})
export class AppModule { }
