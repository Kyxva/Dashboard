import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificarAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if ( !estaAutenticado ) {
                    console.log('Bloqueado por el AuthGuard - CanActivate');
                    this.router.navigate(['./auth/login']);
                  }
                })
              );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificarAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if ( !estaAutenticado ) {
                    console.log('Bloqueado por el AuthGuard - CanLoad');
                    this.router.navigate(['./auth/login']);
                  }
                })
              );

      // if ( this.authService.usuario.id ) {
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard - CanLoad');
      // return false;
  }

}
