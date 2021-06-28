import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]] ,
    email: ['', [ Validators.required, 
                  Validators.email, 
                  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
                ]
            ],
    password: ['', [ Validators.required, Validators.minLength(4) ]],
    confirmarPassword: ['', [ Validators.required, Validators.minLength(4) ]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  registro() {
    const { nombre, email, password, confirmarPassword } = this.miFormulario.value;

    if( password == confirmarPassword ) {
      this.authService.registro( nombre, email, password )
      .subscribe( resp => {
        Swal.fire('Correcto', `${ resp.nombre } ha sido registrado`, 'success');
        this.router.navigateByUrl('/login');
      })
    } else {
      Swal.fire('Error', 'La contraseña no coincide', 'error');
    }

  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].errors
           && this.miFormulario.controls[campo].touched;
  }

}
