import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  signupError: string = '';
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
      this.signupForm = this.fb.group({
          fullName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
        const userData: User = {
            fullName: this.signupForm.value.fullName,
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
        };
        this.authService.signup(userData).subscribe(
            response => {
                console.log('Signup successful', response);
 
                this.router.navigate(['/']);
            },
            error => {
                  this.signupError = error.error.message;
            }
        );
    }
  }
}
