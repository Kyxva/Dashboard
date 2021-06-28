import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor( private authService: AuthService,
               private router: Router ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['./auth/login']);
  }

}
