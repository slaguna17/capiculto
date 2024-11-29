import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { lastValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) { }
  
  get<T>(path: string){
    return lastValueFrom(this.http.get<T>(environment.url + path));
  }
  post<T>(obj: any, path: string){
    return this.http.post<T>(environment.url + path, obj, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  delete<T>(path: string){
    return this.http.delete<T>(environment.url + path);
  }
  put<T>(obj: any, path: string){
    return this.http.put<T>(environment.url + path, obj, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
