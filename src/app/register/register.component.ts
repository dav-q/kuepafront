import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snotifyService: SnotifyService
  ) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/home'])
    }
    this.registerForm = this.formBuilder.group({
      FIRSTNAME : ['', [Validators.required, Validators.maxLength(50)]],
      LASTNAME : ['', [Validators.required, Validators.maxLength(50)]],
      EMAIL : ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      PASSWORD : ['', [Validators.required, Validators.minLength(6)]],
      TYPEUSERID : ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }


  registerSubmit(formData) {

    this.authService.register(formData)
      .subscribe(
        (res: any) => {

          this.registerForm.reset()

          this.authService.loading.hide();

          this.snotifyService.success('Creado', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            position: SnotifyPosition.rightTop,
            animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
          });

        },
        (errors: any) => {

          this.authService.loading.hide();

          var message = 'Error interno, por favor contacta soporte';

          if (errors.error) {
            if (errors.error.type_error == 'not_unique') {
              message = 'Correo electrónico ingresado ya se encuentra en uso'
            }
            if (errors.error.type_error == 'email_valid') {
              message = 'Por favor ingresa una dirección de correo electrónico válida'
            }
            if (errors.error.type_error == 'only_letters') {
              message = 'Nombre(s) y/o apellido(s) incorrectos'
            }
          }

          this.snotifyService.error(message, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            position: SnotifyPosition.rightTop,
            animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
          });

        });

  }

}
