import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { UsuarioLogueadoService } from 'src/app/services/usuario-logueado.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isUserLogin: boolean = false;
  public esAdmin: boolean = false;
  public usuario: Usuario | undefined;
  public username: string = '';
  @Input() idUsuario?: number;

  constructor(
    public dialogo: MatDialog,
    private route: Router,
    private apiservice: ApiService,
    private usuarioLogueado: UsuarioLogueadoService
  ) {}

  ngOnInit(): void {
    this.changeState("inicio")
    this.route.navigate(['/inicio'])
  }
  changeState(id: string){

    var list = document.getElementsByClassName('selected');
    if(list.length > 0) list[0].classList.toggle('selected'); 
    document.getElementById(id)?.classList.toggle('selected');
  }
   openDialogSign() {
    const dialogRef = this.dialogo.open(SignupComponent, { panelClass: 'custom-dialog-container' });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res)
    });
  } 
 
  openDialogLog() {
    const dialogRef = this.dialogo.open(LoginComponent, { panelClass: 'custom-dialog-container' });


    dialogRef.afterClosed().subscribe((userFound) => {
      if(userFound != undefined){
        try {
          this.apiservice.post<any>(userFound.token, '/usuarios/validar')
          this.nuevoUsuarioLogueado(userFound.idUser);
        } catch (error) {
          window.alert("Token vencido")
        }
      }
    });
  } 

  async nuevoUsuarioLogueado(id:number){
    this.usuarioLogueado.cambiarUsuario(id)
    this.usuario = await this.apiservice.get<Usuario>('/usuarios/find/' + id)
    this.esAdmin = this.usuario.esAdmin
    this.username = this.usuario.username
    this.isUserLogin=true
  }

  desloguear(){
    this.isUserLogin=false
    this.usuarioLogueado.eliminarUsuario()
    this.usuario = undefined
    this.esAdmin = false
    this.username= ''
    this.route.navigate(['/inicio'])
  }
}
