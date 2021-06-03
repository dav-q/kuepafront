import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { User } from '../_models/user';

import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user: any;

  constructor(
    private httpClient: HttpClient,
    public loading : NgxSpinnerService
  ) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(data) {

    this.loading.show()

    var url = environment.apiUrl + '/register';

    return this.httpClient.post<User[]>(url, data)
  }

  login(user) {

    this.loading.show()

    var url = environment.apiUrl + '/login';

    return this.httpClient.post(url, user);

  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    location.reload()
  }

}
