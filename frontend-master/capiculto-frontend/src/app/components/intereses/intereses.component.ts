import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento, Locacion, Usuario } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { UsuarioLogueadoService } from 'src/app/services/usuario-logueado.service';

@Component({
  selector: 'app-intereses',
  templateUrl: './intereses.component.html',
  styleUrls: ['./intereses.component.css']
})
export class InteresesComponent implements OnInit {

  public idUsuario?:number
  public usuario?: Usuario 

  public eventosInteres: Array<Evento> = []
  public eventosRecomendados: Array<Evento> = []
  
  constructor(
    private usuarioLogueado: UsuarioLogueadoService,
    private apiService: ApiService,
    @Inject(DOCUMENT) private document: any,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.usuarioLogueado.getUsuario()
    this.crearUsuario()

  }

  async crearUsuario (){
    this.usuario = await this.apiService.get<Usuario>('/usuarios/find/'+ this.idUsuario);
    this.agregarEventosInt()
    this.agregarEventosrRec()
  }
  async agregarEventosInt(){
    await this.apiService.post<Evento[]>(this.usuario,'/eventos/find/UserEvents').subscribe(eventos =>{this.eventosInteres = eventos});
  }
  async agregarEventosrRec(){
    console.log(this.usuario);
    await this.apiService.post<Evento[]>(this.usuario,'/eventos/find/Categoria').subscribe(eventos =>{this.eventosRecomendados = eventos});
   }

   async redirigirLocacion(id:number){
    let locacion = await this.apiService.get<Locacion>('/locacion/'+ id)
    window.open(locacion.direccion);
   }

   async agregarUbicacion(evento: Evento){
     await this.apiService.post<Usuario>(evento,'/usuarios/agregarEvento/'+this.idUsuario).subscribe(x => {
      this.ngOnInit()
     })
     await this.apiService.post<Evento>(undefined,'/eventos/actualizarNumInt/' + evento._id).subscribe();
     
   }

}
