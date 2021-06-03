import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router : Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {            

            if (err.status === 401) {
                this.authenticationService.logout();
                this.router.navigate(['/login'], { queryParams: { returnUrl: '' } });                
            }

            // const error = err.error.message || err.statusText;
            return throwError(err);
        }))
    }
}