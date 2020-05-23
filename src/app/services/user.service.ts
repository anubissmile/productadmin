import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ResponseMessageToken } from '../models/response-message-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.api}/v1/user`;

  constructor(public http: HttpClient) { }

  auth(user: User) {
    return this.http.post<ResponseMessageToken>(`${this.url}/authorize`, user);
  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  retrieveToken(): string {
    return sessionStorage.getItem('token');
  }

  logout(): boolean {
    sessionStorage.removeItem('token');
    return !this.isLogin() ? true : false;
  }

  isLogin(): boolean {
    const token = this.retrieveToken();
    return token === null || token === undefined ? false : true;
  }
}
