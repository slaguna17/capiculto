import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { InteresesComponent } from './components/intereses/intereses.component';
import { AdmiUsuariosComponent } from './components/admi-usuarios/admi-usuarios.component';
import { LocacionesComponent } from './components/locaciones/locaciones.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'intereses',
    component: InteresesComponent
  },
  {
    path: 'eventos', 
    component: EventosComponent
  },
  {
    path: 'admi-usuarios', 
    component: AdmiUsuariosComponent
  },
  {
    path: 'locaciones', 
    component: LocacionesComponent
  },
  {
    path: 'add-evento', 
    component: CrearEventoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
