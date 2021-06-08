import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavBarComponent {

  get usuario() {
    return this.authService.usuario;
  }

  constructor( private authService: AuthService ) { }

}
