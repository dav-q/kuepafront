import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snotifyService: SnotifyService,
    private router: Router,
    private authService: AuthenticationService
  ) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/home'])
    }

    this.loginForm = this.formBuilder.group({
      EMAIL : ['', [Validators.required, Validators.maxLength(60), Validators.email]],
      PASSWORD : ['', [Validators.required, Validators.minLength(6)]]
    })

  }

  ngOnInit(): void {
  }


  loginSubmit(formData){

    this.authService.loading.show();

    if(this.loginForm.valid){
      this.authService.login(formData)
        .subscribe(
          async(res: any) => {
            res.user.token = res.token
            localStorage.setItem('currentUser', JSON.stringify(res.user));
            this.authService.currentUserSubject.next(res.user);
            location.reload()
          },
          (errors: any) => {

            this.authService.loading.hide();

            var message = 'Correo electrónico o contraseña inválido(s)';

            if (errors.error) {
              if (errors.error.type_error == 'email_valid') {
                message = 'Por favor ingresa una dirección de correo electrónico válida'
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

}
