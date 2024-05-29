import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7155/api/Account/';

  private userPayload: any;

  constructor(private http: HttpClient,private router: Router) {
    this.userPayload = this.decodedToken();
  }

  login(credentials: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login`, credentials);
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}signup`, userData);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token);
  }
  getUserIdFromToken(){
      if(this.userPayload)
        return this.userPayload.UserID;
  }
}
