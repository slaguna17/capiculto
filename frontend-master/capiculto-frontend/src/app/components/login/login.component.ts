import { Usuario } from 'src/app/models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  correoForm?:string; 
  passForm?:string; 

  placeUser='Ingresar Usuario'
  placePass='Ingresar Contraseña'

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private apiService: ApiService) {}

  ngOnInit() {}

  closeDialog(){
    this.dialogRef.close(undefined)
  }

  async onSubmit() {
    try {
      var userFound: any = await this.apiService.get<any>('/usuarios/login/' + this.correoForm + '/' + this.passForm) ;  
      this.dialogRef.close(userFound)

      
    } catch (error) {
      console.log(error);
      window.alert("Correo o Contraseña no registrados");
    }
  }
}