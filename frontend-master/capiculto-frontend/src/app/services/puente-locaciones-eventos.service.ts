import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuenteLocacionesEventosService {

  @Output() disparadosIdLocacion? : number

  constructor() { }
  
  cambiarLocacion(idLocacion: number){
    this.disparadosIdLocacion = idLocacion;
    console.log("ya está", this.disparadosIdLocacion);
    return 'logrado'
  }
  getLocacion(){
    return this.disparadosIdLocacion
  }

  eliminarLocacion(){
    this.disparadosIdLocacion = undefined;
    console.log("eliminado", this.disparadosIdLocacion);
    return 'logrado'
  }
}
