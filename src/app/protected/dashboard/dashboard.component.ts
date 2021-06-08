import { Component } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { RESTWeatherResponse } from '../../auth/interfaces/clima.interdace';
import { ZonasService } from '../../services/zonas.service';
import { ZonesResponse } from '../../auth/interfaces/zonas.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent {

  tareas: string[] = [];
  clima!: RESTWeatherResponse;
  zonas!: ZonesResponse;
  zonasHorarias: Array<string> = [];
  fechaActual!: Date;
  fechaUTC!: Date;
  fechaCiudad!: Date;
  
  
  constructor( private climaService: ClimaService,
               private zonaService: ZonasService,
               private authService: AuthService ) { this.obtenerTareas(); }

  obtenerTareas() {
    this.authService.obtenerTareas()
      .subscribe( resp => this.tareas = resp )
  }

  obtenerClima( pais: string ) {
    this.climaService.obtenerClima( pais )
      .subscribe( resp => this.clima = resp );
  }

  obtenerHora( paisCode: string ) {
    this.zonaService.obtenerZonas( paisCode )
    .subscribe( resp => {
      this.zonas = resp;
      this.fechaActual = new Date();
      this.fechaUTC = new Date(this.fechaActual.getUTCFullYear(), this.fechaActual.getUTCMonth(), this.fechaActual.getUTCDate(), this.fechaActual.getUTCHours(), this.fechaActual.getUTCMinutes());
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[0].gmtOffset));

      if ( paisCode === 'MX' ) {
        this.zonasHorarias = [
          'Ciudad de México',
          'La Paz',
          'Tijuana'
        ];
      } else if ( paisCode === 'AR' ) {
        this.zonasHorarias = [
          'Buenos aires'
        ];
      } else if ( paisCode === 'BR' ) {
        this.zonasHorarias = [
          'Brasilia',
          'Fernando de Noronha',
          'Belén',
          'Manaos',
          'Rio Branco'
        ];
      }

    });
  }

  select( zona: string ) {

    this.fechaActual = new Date();
    this.fechaUTC = new Date(this.fechaActual.getUTCFullYear(), this.fechaActual.getUTCMonth(), this.fechaActual.getUTCDate(), this.fechaActual.getUTCHours(), this.fechaActual.getUTCMinutes());

    if ( zona === 'Ciudad de México' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[0].gmtOffset));
    } else if ( zona === 'La Paz' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[2].gmtOffset));
    } else if ( zona === 'Tijuana' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[10].gmtOffset));
    }

    if ( zona === 'Buenos Aires' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[0].gmtOffset));
    }

    if ( zona === 'Brasilia' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[0].gmtOffset));
    } else if ( zona === 'Fernando de Noronha' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[10].gmtOffset));
    } else if ( zona === 'Belén' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[2].gmtOffset));
    } else if ( zona === 'Manaos' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[9].gmtOffset));
    } else if ( zona === 'Rio Branco' ) {
      this.fechaCiudad = new Date(this.fechaUTC.setSeconds(this.zonas.zones[13].gmtOffset));
    } 

  }

}
