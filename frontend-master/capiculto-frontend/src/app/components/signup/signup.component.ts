
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsuarioPost } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public nombre:string = ""
  public username:string = ""
  public correo:string = ""
  public password:string = ""
  public repeatPassword:string = ""
  public existeCorreo:boolean =false;
  public existeUsername:boolean =false;

  placeUser='Ingresar Usuario'
  placePass='Ingresar Contraseña'
  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
    private apiService: ApiService) { }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close()
  }

  async verificarMail(email:string){
    this.existeCorreo = await this.apiService.get<any>('/usuarios/find/correo/' + email);
    return this.existeCorreo
  } 
  async verificarUsername(username:string){
    this.existeUsername = await this.apiService.get<any>('/usuarios/find/username/' + username);
    return this.existeUsername
  } 

  async onSubmit() {
    if(this.nombre == "" || this.username == "" || this.correo == "" || this.password == "" || this.repeatPassword == "") {
      window.alert("Llenar todos los campos")
      Error
    } else if(this.password != this.repeatPassword){
      window.alert("No es la misma contrasena")
    }else if(await this.verificarMail(this.correo)){
      window.alert("Correo ya existente")
    }else if(await this.verificarUsername(this.username)){
      window.alert("Username en uso")
    } else {
      try {
        var nuevoUsuario: UsuarioPost = 
        {
          nombre:this.nombre,
          correo:this.correo,
          password:this.password,
          username:this.username,
          intereses:[],
          eventosInteres:[],
          esAdmin : false
        }
        await this.apiService.post<any>(nuevoUsuario,'/usuarios/registro').subscribe(x => {
          console.log(x);
        })
        this.dialogRef.close()
        window.alert("Usuario creado exitosamente, porfavor iniciar sesion!")
      } catch (error) {
        console.log(error);
        window.alert("Usuario ya existe");
      }
    }
  }
}