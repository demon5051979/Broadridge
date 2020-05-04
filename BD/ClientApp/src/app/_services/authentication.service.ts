import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable()
export class AuthenticationService {
  baseUrl: any;
  _localStorage: string = "local_data";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this._localStorage)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //login by email after azure active directory logining
  loginByEmail(email: string) {
    return this.http.post<any>(`${this.baseUrl}users/authenticate`, { UserName: email })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(this._localStorage, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this._localStorage);
    this.currentUserSubject.next(null);
  }
}
