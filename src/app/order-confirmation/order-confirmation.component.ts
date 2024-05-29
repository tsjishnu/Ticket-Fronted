import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  order: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras?.state?.['order'];
  }

  ngOnInit(): void {
    if (!this.order) {
      console.error('No order data available');
    }
  }
  goToHome(): void {
    this.router.navigate(['/userHome']);
  }

}
