import { Component, Input, SimpleChanges } from '@angular/core';
import { Match } from '../models/match';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatchService } from '../services/match.service';
import { Order } from '../models/order';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  @Input() match!: Match;
  selectedPlan: number = 0; // For storing the selected plan amount
  selectedTicketPlan : string = "";
  selectedPlanIndex: number = 0; 
  ticketPlans: { name: string, amount: number }[] = [];
  quantity: number = 1;
  totalPrice: number = 0;
  public UserID: string = "";

  constructor( private matchService: MatchService, private userStore: UserStoreService,private auth: AuthService, private route: Router) {
  }

  ngOnInit(){
    this.userStore.getUserIdFromStore().subscribe (val =>{
      let getUserIdFromToken = this.auth.getUserIdFromToken();
      this.UserID = val || getUserIdFromToken
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['match'] && changes['match'].currentValue) {
      const minAmount = this.match.ticketPrice;
      this.ticketPlans = [
        { name: 'Regular', amount: minAmount, },
        { name: 'VIP', amount: minAmount * 2 }, // 200% of the minimum amount
        { name: 'Premium', amount: minAmount * 1.5 }, // 150% of the minimum amount
      ];
      // Set default selected plan
      this.selectedPlanIndex = 0;
      this.calculateTotalPrice();
      console.log(this.totalPrice);
    }
  }
  onSubmit() {
    const confirmMessage = `You are about to book ${this.quantity} ticket(s) for the ${this.getSelectedPlanName()} plan at a total cost of ${this.totalPrice}. Do you want to proceed?`;
    if (confirm(confirmMessage)) {
      console.log('Booking confirmed');

      const order: Order = {
        UserID: this.UserID,
        matchID: this.match.matchId,
        ticketQuantity: this.quantity,
        ticketPlan: this.getSelectedPlanName(),
        totalAmount: this.totalPrice
      };
      console.log(order);
      this.matchService.createOrder(order).subscribe(
        response => {
          console.log(order);
          console.log('Order created successfully', response);
          this.route.navigate(['/orderConfirmation'], { state: { order } });
          
        },
        error => {
          console.error('Error creating order', error);
          // Handle error
        }
      );
    } else {
      console.log('Booking cancelled');
    }

  }
  private getSelectedPlanName(): string {
    return this.ticketPlans[this.selectedPlanIndex].name;
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.ticketPlans[this.selectedPlanIndex].amount * this.quantity;
  }
}
