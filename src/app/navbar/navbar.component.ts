import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() invokeViewOrders: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService,private router: Router) {}
  logout() {
    this.authService.logout();
  }

}
