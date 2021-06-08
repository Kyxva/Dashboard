import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RESTWeatherResponse } from '../auth/interfaces/clima.interdace';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private apiKey: string = '38be440ba85848fcb3f215614210706';
  private apiUrl: string = 'http://api.weatherapi.com/v1';

  constructor( private http: HttpClient ) { }

  obtenerClima( query: string ) {

    const params = new HttpParams()
      .set( 'key', this.apiKey )
      .set( 'aqi', 'no' )
      .set(  'q', query );

    const url = `${ this.apiUrl }/current.json`;

    return this.http.get<RESTWeatherResponse>( url, { params } );

  }

}
