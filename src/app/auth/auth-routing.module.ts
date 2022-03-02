import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SolicitudComponent } from '../solicitud/solicitud.component';
import { SolicitudesComponent } from '../solicitudes/solicitudes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../auth.guard';
import { EstadosComponent } from '../estados/estados.component';

const routes: Routes=[

  {path: '', component:HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'solicitudes', component:SolicitudesComponent , canActivate:[AuthGuard]},
  {path: 'solicitud', component:SolicitudComponent, canActivate:[AuthGuard]},
  {path: 'editar-solicitud/:id', component:SolicitudComponent, canActivate:[AuthGuard]},
  {path: 'estados/:id', component:EstadosComponent, canActivate:[AuthGuard]}

]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
