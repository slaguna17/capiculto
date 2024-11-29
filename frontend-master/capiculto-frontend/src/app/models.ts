export class Usuario {
  constructor(
    public _id: number,
    public nombre: string,
    public correo: string,
    public password: string,
    public username: string,
    public intereses: Array<string>,
    public eventosInteres: Array<number>,
    public esAdmin: boolean,
    public __v: number
  ){

  }
}
export class Locacion {
  constructor(
    public _id: number,
    public nombre: string,
    public email: string,
    public direccion: string,
    public contacto: string,
    public imagen:string,
    public __v: number
  ){

  }
}
export class Evento {
  constructor(
    public _id: number,
    public titulo: string,
    public descripcion: string,
    public imagen: string,
    public locacion: number,
    public fecha: string,
    public hora: string,
    public num_interesados: number,
    public links: Array<string>,
    public categoria: string,
    public __v: number
  ){

  }
}

export class EventoPost {
  constructor(
    public titulo: string,
    public descripcion: string,
    public imagen: string,
    public locacion: number,
    public fecha: string,
    public hora: string,
    public categoria: string,
    public links: Array<string>,
    public num_interesados: number
  ){

  }
}

export class UsuarioPost {
  constructor(
    public nombre: string,
    public correo: string,
    public password: string,
    public username: string,
    public intereses: Array<string>,
    public eventosInteres: Array<number>,
    public esAdmin: boolean
  ){

  }
}

