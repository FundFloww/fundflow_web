import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
// import { PerfilEmprendedorComponent } from './perfiles/perfil-emprendedor/perfil-emprendedor.component';
// import { PerfilInversorComponent } from './perfiles/perfil-inversor/perfil-inversor.component';}
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { IdeaComponent } from './pages/idea/idea.component';
import { FormIdeaComponent } from './pages/form-idea/form-idea.component';
import { LogoutComponent } from './components/logout/logout.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'perfil/editar', component: EditarPerfilComponent },
    { path: 'perfil/:id', component: PerfilesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'noticias', component: NoticiasComponent},
    { 
        path: 'idea',
        children: [
            { path: 'añadir', component: FormIdeaComponent },
            { path: ':id', component: IdeaComponent },
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
        ]
    },
    {
        path: 'invertir',
        children: [
            { path: ':id', component: IdeaComponent },
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];
