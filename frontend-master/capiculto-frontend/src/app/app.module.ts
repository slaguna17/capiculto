import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InteresesComponent } from './components/intereses/intereses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { EventosComponent } from './components/eventos/eventos.component';
import { AdmiUsuariosComponent } from './components/admi-usuarios/admi-usuarios.component';
import { LocacionesComponent } from './components/locaciones/locaciones.component';
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { InicioComponent } from './components/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InteresesComponent,
    EventosComponent,
    AdmiUsuariosComponent,
    LocacionesComponent,
    CrearEventoComponent,
    LoginComponent,
    SignupComponent,
    InicioComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
