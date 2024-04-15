import { NgModule } from '@angular/core';
import { IdeasServicioService } from './services/ideas/ideas-servicio.service';
import { WebSocketsService } from './services/web-sockets/web-sockets.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [IdeasServicioService, WebSocketsService],
  bootstrap: []
})
export class AppModule { }