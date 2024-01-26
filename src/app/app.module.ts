import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './inicio/inicio.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RouterModule
  ],
  exports: [
    // RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
