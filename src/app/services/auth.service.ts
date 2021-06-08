import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioResponse, Usuario } from '../auth/interfaces/usuario.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean = false;
  private apiUrl: string = 'http://localhost:8080/api/usuario';
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor( private http: HttpClient ) { }

  login( email: string ) {
    this.isLogin = true;
    return this.http.post<UsuarioResponse>( this.apiUrl, email )
      .pipe(
        tap( resp => {
          if(resp == null) {
            return
          } else {
            this._usuario = {
            nombre: resp.nombre,
            email: resp.email,
            fechaLogin: new Date()
            }
          }
        })
      )
  }

  registro( nombre: string, email: string, password: string ) {
    const url = `${ this.apiUrl }/guardar`;
    const body = { nombre, email, password }
    return this.http.post<UsuarioResponse>( url, body );
  }

  obtenerUsuarios() {
    return this.http.get<UsuarioResponse[]>( this.apiUrl );
  }

  obtenerTareas() {
    const url = `${ this.apiUrl }/tareas`;
    return this.http.get<Array<string>>( url );
  }

  logout() {
    this.isLogin = false;
  }

}
