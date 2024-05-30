import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import ValidateForm from '../helpers/validateform';

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
          password: ['',[ Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
      });
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
        console.log("model valid")
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
    else{
        ValidateForm.validateAllFormFields(this.signupForm);
    }
  }
}
