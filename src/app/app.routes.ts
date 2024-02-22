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
import { EnviarMensajeComponent } from './components/enviar-mensaje/enviar-mensaje.component';
import { InvertirComponent } from './pages/invertir/invertir.component';
import { SideBarAdminComponent } from './components/side-bar-admin/side-bar-admin.component';
import { ZonaAdminComponent } from './pages/zona-admin/zona-admin.component';
import { ZonaAdminUsuariosComponent } from './pages/zona-admin-usuarios/zona-admin-usuarios.component';
import { ZonaAdminIdeasComponent } from './pages/zona-admin-ideas/zona-admin-ideas.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { 
        path: 'perfil', 
        children: [
            { path: 'editar', component: EditarPerfilComponent },
            { 
                path: ':id', 
                children: [
                    { path: '', component: PerfilesComponent },
                    { path: 'correo', component: EnviarMensajeComponent }
                ]
             },
        ],
    },
    { path: 'invertir/:id', component: InvertirComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/recuperar', component: RecuperarComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'noticias', component: NoticiasComponent},
    { 
        path: 'admin',
        component: ZonaAdminComponent,
        children: [
            { path: 'usuarios', component: ZonaAdminUsuariosComponent },
            { path: 'ideas', component: ZonaAdminIdeasComponent },
            { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
        ]
    },
    { 
        path: 'idea',
        children: [
            { path: 'añadir', component: FormIdeaComponent },
            { path: ':id', component: IdeaComponent },
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];
