import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['', [ Validators.required, 
                  Validators.email, 
                  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
                ]
            ],
    password: ['', [ Validators.required, Validators.minLength(4) ]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) {  }

  login() {
    const { email, password } = this.miFormulario.value;
    
    this.authService.login( email )
      .subscribe( resp => {

        if(resp == null) {
          Swal.fire('Error', 'El correo es incorrecto', 'error');
        } else if(password == resp.password) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', 'La contraseña es incorrecta', 'error');
        }

      });
  }

}
