import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ZonesResponse } from '../auth/interfaces/zonas.interface';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  private apiKey: string = 'E5FVSLD4I55U';
  private apiUrl: string = 'http://api.timezonedb.com/v2.1';

  constructor( private http: HttpClient ) { }

  obtenerZonas( query: string ) {

    const params = new HttpParams()
      .set( 'key', this.apiKey )
      .set( 'format', 'json' )
      .set( 'country', query );

    const url = `${ this.apiUrl }/list-time-zone`;

    return this.http.get<ZonesResponse>( url, { params } );

  }

}
