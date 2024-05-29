// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { Login } from '../models/login';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    const credentials: User = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.authService.storeToken(response.token)
        this.router.navigate(['/userHome']);
      },
      error: error => {
          this.loginError = error.error.message;
      }
    });
  }
}

