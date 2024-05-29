import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { NavbarComponent } from './navbar/navbar.component';
import { authGuard } from './guards/auth.guard';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';


const routes: Routes = [
  { path: '', component: LoginComponent},  
  { path: 'signup', component: SignupComponent },
  { path: 'userHome', component: UserHomeComponent, canActivate: [authGuard]},
  { path: 'orderConfirmation', component: OrderConfirmationComponent, canActivate: [authGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserHomeComponent,
    UpcomingMatchesComponent,
    BookTicketComponent,
    NavbarComponent,
    OrderConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
