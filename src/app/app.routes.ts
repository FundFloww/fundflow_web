import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
// import { PerfilEmprendedorComponent } from './perfiles/perfil-emprendedor/perfil-emprendedor.component';
// import { PerfilInversorComponent } from './perfiles/perfil-inversor/perfil-inversor.component';}
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { IdeaComponent } from './idea/idea.component';
import { FormIdeaComponent } from './form-idea/form-idea.component';
import { LogoutComponent } from './logout/logout.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'perfil', component: PerfilesComponent },
    { path: 'perfil/editar', component: EditarPerfilComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
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
