import { Component, OnInit } from '@angular/core';
import { Usuario} from 'src/app/models';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-admi-usuarios',
  templateUrl: './admi-usuarios.component.html',
  styleUrls: ['./admi-usuarios.component.css']
})
export class AdmiUsuariosComponent implements OnInit {

  imagen_Usuario :string="./assets/icons8-user-64.png"
  imagen_Eliminar :string="./assets/icons8-delete-200.png"
  titulo_Usuarios: string= "Usuarios Administradores";
  //num_Usuario:;
  username_Usuario: string= "";
  //correo: ;
  correo_Usuario: string= "";
  filtro_Username: string="";
  
  constructor(
    private apiService: ApiService
  ) { }

  public usuAdmi_array: Array<Usuario> = [
  ]

  ngOnInit(): void {
    this.getUsuarios(); 
  }
  async getUsuarios(){
    this.usuAdmi_array = await this.apiService.get<Usuario[]>('/usuarios/esAdmin');
  }
  async convertirUser(){
    let usuarios= await this.apiService.get<Usuario[]>('/usuarios/find');
    for (var i=0; i<usuarios.length; i++){
      if(usuarios[i].correo == this.correo_Usuario && usuarios[i].username == this.username_Usuario ){
        usuarios[i].esAdmin = true;
        await this.apiService.put<Usuario>(usuarios[i],'/usuarios/' + usuarios[i]._id).subscribe();
        this.crearAdminMostrar();
        alert("Se logro convertir a "+usuarios[i].username + " en administrador ");
        return this.ngOnInit();
      }
    }
    this.crearAdminMostrar();
    return alert("No se encontro al usuario ");
  }
  crearAdminMostrar(){
    var element = document.getElementById("Crear_admin");
    if (element) {
    var display = element.style.display;

      if (display == "none") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  }
  async filtrarXUsername(){
    this.usuAdmi_array=[];
    let usuarios = await this.apiService.get<Usuario[]>('/usuarios/esAdmin');
    this.usuAdmi_array= usuarios.filter((p) => p.username.includes(this.filtro_Username))
  }
  async quitarUsuarioAdmin(id_usuario : number){
    let usuario= await this.apiService.get<Usuario>('/usuarios/find/' + id_usuario);
    usuario.esAdmin = false;
    var reply=confirm("Seguro que deseas quitar el rol administrador a:  " + usuario.username);
    if (reply==true){
      await this.apiService.put<Usuario>(usuario,'/usuarios/' + usuario._id).subscribe(x => {
        console.log(x)
        this.ngOnInit();
      });;
    }
  }

  
}