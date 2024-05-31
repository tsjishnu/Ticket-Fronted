import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UpcomingMatchesComponent } from '../upcoming-matches/upcoming-matches.component';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7155/api/Account/';

  private userPayload: any;

  constructor(private http: HttpClient, private router: Router,private userStore: UserStoreService) {
    this.userPayload = this.decodedToken();
  }

  login(credentials: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login`, credentials);
  }

  signup(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post<any>(`${this.baseUrl}signup`, userData);
  }

  async logout() {
    await sessionStorage.clear();
    await sessionStorage.removeItem('token');
    this.userPayload = null;
    this.userStore.setStoreFromStore('');
    this.router.navigate(['/']);
  }

  storeToken(tokenValue: string) {
    sessionStorage.setItem('token', tokenValue);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      console.log(jwtHelper.decodeToken(token));
      return jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }

  getUserIdFromToken() {
    if (this.userPayload) {
      return this.userPayload.nameid;
    }
  }
}
