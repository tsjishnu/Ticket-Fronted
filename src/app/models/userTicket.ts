import { Match } from './match';

export interface UserTickets {
  match: Match;
  ticketQuantity: number;
  ticketPlan: string;
  totalAmount: number;
}
