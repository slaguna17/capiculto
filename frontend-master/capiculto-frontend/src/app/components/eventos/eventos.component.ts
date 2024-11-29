import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Evento} from 'src/app/models';
import { Usuario} from 'src/app/models';
import { Locacion} from 'src/app/models';
import { UsuarioLogueadoService } from 'src/app/services/usuario-logueado.service';
import { ApiService } from '../../services/api.service';
import { PuenteLocacionesEventosService } from 'src/app/services/puente-locaciones-eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  array_Filtros = new Array(5).fill(false);
  tipos_Filtros = ["musica", "cultura", "tecnologia", "educacion", "entretenimiento" ];
  texto_filtro: string = "";
  esAdmin: boolean = false;
  eventosInteres: number[]=[];
  id_usuario?: number;
  userLogeado: Boolean=false;

  public eventos_array: Array<Evento> = [];
  
  constructor(
    private apiService: ApiService,
    private usuarioLogueado: UsuarioLogueadoService,
    private puenteLocacionEventos: PuenteLocacionesEventosService
  ) {}

  public eventosSelccionado: Array<Evento> = []
  
  ngOnInit(): void {
    var locacion = this.puenteLocacionEventos.getLocacion();
    console.log(locacion);
    this.id_usuario = this.usuarioLogueado.getUsuario();
    this.llenarDatosUsuario();

    if (locacion == undefined){
      this.getEventos();
    } else {
      this.getEventoSelect(locacion);
    }
  }


  async llenarDatosUsuario(){
    if(this.id_usuario != null){
      const usuario = await this.apiService.get<Usuario>('/usuarios/find/' + this.id_usuario);
      if(usuario != null){
        this.esAdmin = usuario.esAdmin;
        this.eventosInteres = usuario.eventosInteres;
        this.userLogeado = true;
      }
    }
  }
  puedeDarMeInteresa(id_evento : number){
    if(!this.esAdmin && this.userLogeado){
      return !this.eventosInteres.includes(id_evento);
    }
    return false;
  }
 
  async getEventos(){
    this.eventos_array = await this.apiService.get<Evento[]>('/eventos/find/all');
  }

  async getEventoSelect(id_locacion :number){
    this.eventos_array = await this.apiService.get<Evento[]>('/eventos/find/EventbyLocacion/'+ id_locacion);
    this.puenteLocacionEventos.eliminarLocacion();
  }

  async buscarUbicacion(id_locacion :number){
    let locacion = await this.apiService.get<Locacion>('/locacion/' + id_locacion);
    if(locacion!= null)
      window.open(locacion.direccion, '_blank');
    else
      window.open("https://www.google.com/maps", '_blank');
  }
  async eliminarEvento(id_evento :number){
    let response = await this.apiService.get<any>('/eventos/delete/' +id_evento);
    this.ngOnInit();
    console.log(response);
  }
  eliminarEventoConfirmacion(id_evento :number){
    let pos=0;
    for (var i=0; i<this.eventos_array.length; i++)
      if( this.eventos_array[i]._id == id_evento)
        pos=i;
    var reply=confirm("Seguro que deseas borrar el evento :  " + this.eventos_array[pos].titulo);
    if (reply==true){
      this.eliminarEvento(id_evento);
    }
  }
  
  async agregarInteres(evento : Evento){
    await this.apiService.post<Evento>(undefined,'/eventos/actualizarNumInt/' + evento._id).subscribe();
    await this.apiService.post<Usuario>(evento,'/usuarios/agregarEvento/' +this.id_usuario).subscribe( res => {
      console.log(res)
    });
    this.ngOnInit();
  }
  async filtrarEventos(){
    var filtros =[];
    let respuesta:any;
    let respuesta2:any;
    let eventosFiltrados: Array<Evento> = [];
    for (var i=0; i<this.array_Filtros.length; i++)
      if(this.array_Filtros[i])
       filtros.push(this.tipos_Filtros[i])
    if(filtros.length !=0){
      let filtro = {
        intereses: filtros,
      }
      respuesta = await this.apiService.post<Evento[]>(filtro,'/eventos/find/Categoria2').toPromise();
      eventosFiltrados = respuesta;
    } 
    if(this.texto_filtro!=""){
      respuesta2 = await this.apiService.get<Evento[]>('/eventos/find/EventbyName/' +this.texto_filtro );
      if(filtros.length !=0){
        eventosFiltrados =[];
        for (var i=0; i<respuesta.length; i++)
          for (var j=0; j<respuesta2.length; j++)
            if(respuesta2[j]._id == respuesta[i]._id)
               eventosFiltrados.push(respuesta[i]);
      }
      else
        eventosFiltrados = respuesta2;
    }
    if(filtros.length !=0 || this.texto_filtro!="")
      this.eventos_array = eventosFiltrados;
    else
      this.eventos_array = await this.apiService.get<Evento[]>('/eventos/find/all');
  } 
  filtroMostrar(){
    var element = document.getElementById("Filtros_Interes");
    if (element) {
    var display = element.style.display;

      if (display == "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  }

}
