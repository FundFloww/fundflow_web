import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { EnviarMensajeComponent } from './components/enviar-mensaje/enviar-mensaje.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { FormIdeaComponent } from './pages/form-idea/form-idea.component';
import { IdeaComponent } from './pages/idea/idea.component';
import { InvertirComponent } from './pages/invertir/invertir.component';
import { LoginComponent } from './pages/login/login.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ZonaAdminIdeasComponent } from './pages/zona-admin-ideas/zona-admin-ideas.component';
import { ZonaAdminUsuariosComponent } from './pages/zona-admin-usuarios/zona-admin-usuarios.component';
import { ZonaAdminComponent } from './pages/zona-admin/zona-admin.component';

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
    { path: 'chat', component: ChatPageComponent},
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
