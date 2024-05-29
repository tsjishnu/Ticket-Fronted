import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match';
import { Order } from '../models/order';
import { UserTickets } from '../models/userTicket';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private baseUrl = 'https://localhost:7155/api/user';
  constructor(private http: HttpClient){ }

  getUpcomingMatches(): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.baseUrl}/upcoming-matches`)
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-order`, order);
  }
  
  getUserOrders(userId: string): Observable<UserTickets[]> {
    return this.http.get<UserTickets[]>(`${this.baseUrl}/${userId}`); // Replace '/api/user/' + userId + '/orders' with your API endpoint
  }

}
