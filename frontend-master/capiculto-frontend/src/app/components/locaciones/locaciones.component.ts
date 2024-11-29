import { Component, OnInit } from '@angular/core';
import { Locacion} from 'src/app/models';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { PuenteLocacionesEventosService } from 'src/app/services/puente-locaciones-eventos.service';

@Component({
  selector: 'app-locaciones',
  templateUrl: './locaciones.component.html',
  styleUrls: ['./locaciones.component.css']
})
export class LocacionesComponent implements OnInit {
  imagen_Usuario :string="./assets/icons8-user-64.png"
  //num_Usuario:;
  nombre_Teatro: string= "Teatro X";
  contacto_evento: string= "Contacto";
  direccion_Evento: string= "Drección: link";

  public locaciones_array: Array<Locacion> = [];
  
  constructor(
    private apiService: ApiService,
    private puenteLocacionEventos: PuenteLocacionesEventosService
  ) {}

  ngOnInit(): void {
    this.getLocaciones(); 
  }
  async getLocaciones(){
    this.locaciones_array = await this.apiService.get<Locacion[]>('/locacion/find/all');
  }

  async buscarUbicacion(locacion :Locacion){
    console.log(locacion.direccion)
    if(locacion.direccion!= null)
      window.open(locacion.direccion, '_blank');
    else
      window.open("https://www.google.com/maps", '_blank');
  }

  async verEvento (id_locacion :number){
    this.puenteLocacionEventos.cambiarLocacion(id_locacion)
    //let locacion = await this.apiService.get<Locacion>('/locacion/' + id_locacion);
  }
  
  async changeState(id: string){
    var list = document.getElementsByClassName('selected');
    if(list.length > 0) list[0].classList.toggle('selected'); 
    document.getElementById(id)?.classList.toggle('selected');

  }
}
