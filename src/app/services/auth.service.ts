import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { UsuarioResponse, Usuario } from '../auth/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8080/api/usuario';
  private _usuario: Usuario | undefined;

  get usuario(): Usuario {
    return { ...this._usuario! };
  }

  constructor( private http: HttpClient ) { }

  login( email: string ) {
    return this.http.post<UsuarioResponse>( this.apiUrl, email )
      .pipe(
        tap( resp => {
          if(resp == null) {
            return;
          } 
          localStorage.setItem('token', resp.id!.toString() );
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
    this._usuario = undefined;
    localStorage.clear();
  }

  verificarAutenticacion(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) {
      return of( false );
    }

    return this.http.get<Usuario>( `${ this.apiUrl }/${ localStorage.getItem('token') }` )
            .pipe(
              map( resp => {
                this._usuario = resp;
                this._usuario.fechaLogin = new Date();
                return true;
              })
            );
  }

}
