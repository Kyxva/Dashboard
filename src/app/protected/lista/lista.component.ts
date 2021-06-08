import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioResponse } from '../../auth/interfaces/usuario.interface';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: UsuarioResponse[] = [];

  get user() {
    return this.authService.usuario;
  }

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
    this.authService.obtenerUsuarios()
      .subscribe( resp => this.usuarios = resp );
  }

}
