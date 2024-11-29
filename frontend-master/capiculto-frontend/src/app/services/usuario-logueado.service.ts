import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoService {

  @Output() disparadosIdUsuario? : number

  constructor() { }

  cambiarUsuario(idUsuario: number){
    this.disparadosIdUsuario = idUsuario;
    return 'logrado'
  }
  getUsuario(){
    return this.disparadosIdUsuario
  }
  eliminarUsuario(){
    this.disparadosIdUsuario = undefined;
    return 'logrado'
  }

}
