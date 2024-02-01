import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilEmprendedorComponent } from './perfil-emprendedor/perfil-emprendedor.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { IdeaComponent } from './idea/idea.component';
import { FormIdeaComponent } from './form-idea/form-idea.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'perfil', component: PerfilEmprendedorComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { 
        path: 'idea',
        children: [
            { path: 'anadir', component: FormIdeaComponent },
            { path: ':id', component: IdeaComponent },
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];
