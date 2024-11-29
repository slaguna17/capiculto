import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento, EventoPost, Locacion} from 'src/app/models';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  public locaciones_array: Array<Locacion> = [];
  public titulo: string="";
  public descripcion: string=""; 
  public imagen: string="";
  public locacion: number=0;
  public fecha: string="";
  public hora: string="";
  public categoria:string="";
  public num_interesados: number = 0;

  public fb:string="";
  public tw:string="";
  public ig:string="";
  public lk:string="";

  public array_links:string[]=[]
  constructor(
    private apiService: ApiService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getLocaciones()
  }
  async getLocaciones(){
    this.locaciones_array = await this.apiService.get<Locacion[]>('/locacion/find/all');
  }

  validar(){
    if(!(this.titulo.length ==0) && !(this.descripcion == "") && !(this.locacion==0) && !(this.categoria=="") ){
      console.log("campos validos")
      return true;
    }else{
    console.log(Error);
    
    return false;
    }
  }
  async onSubmit(){
    if(this.fb==''){
      this.array_links?.push('null')
    }else{
      this.array_links?.push(this.fb)
    }
    if(this.ig==''){
      this.array_links?.push('null')
    }else{
      this.array_links?.push(this.ig)
    }
    if(this.lk==''){
      this.array_links?.push('null')
    }else{
      this.array_links?.push(this.lk)
    }
    if(this.tw==''){
      this.array_links?.push('null')
    }else{
      this.array_links?.push(this.tw)
    }

    if(this.imagen==''){
      this.imagen = './assets/icons8-event-100.png'
    }

    var eventoForm: EventoPost = 
     {titulo:this.titulo,
      descripcion:this.descripcion,
      imagen:this.imagen,
      locacion:this.locacion,
      fecha:this.fecha,
      hora:this.hora,
      categoria:this.categoria,
      num_interesados:this.num_interesados,
      links:this.array_links}
    
    try {
      if (this.validar()){
      await this.apiService.post<any>(eventoForm, '/eventos/' ).subscribe(res =>{
        console.log(res)
        this.array_links = []
        this.fb ="";
        this.tw="";
        this.ig="";
        this.lk="";
        this.imagen=''
        this.route.navigate(['/eventos'])

      }) ;  
    }else{
      window.alert("Debe llenar los campos obligatorios");
      Error
    }
      
    } catch (error) {
      console.log(error);
      window.alert("Ocurrio un error al crear el evento");
     }
  }
  cargarLink(){
    var element = document.getElementById("linkDialog");
    if (element) {
    var display = element.style.display;

      if (display == "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  }

  imimg(){
    if(this.imagen == ''){
      return './assets/picture-icon.png'
    }else{
      return this.imagen
    }
  }
}
