import { Component } from '@angular/core';
import { Match } from '../models/match';
import { MatchService } from '../services/match.service';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { UserTickets } from '../models/userTicket';

@Component({
  selector: 'app-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent {
  matches : Match[]= [];
  userTickets : UserTickets[]= [];
  errorMessage: string ='';
  selectedMatch: Match | null = null;
  public UserID: string = "";

  constructor(private matchService: MatchService,private userStore: UserStoreService,private auth: AuthService,){}

  ngOnInit(){
    this.matchService.getUpcomingMatches().subscribe(
      (data) => {
        this.matches = data;
      },
      (error) => {
        this.errorMessage = 'could not load upcoming matches';
        console.error(error);
      }
    );

    this.userStore.getUserIdFromStore().subscribe (val =>{
      let getUserIdFromToken = this.auth.getUserIdFromToken();
      this.UserID = val || getUserIdFromToken
    })

    if (this.UserID) {
      this.matchService.getUserOrders(this.UserID).subscribe(
        (order) => {
          this.userTickets = order;
          console.log(order);
        },
        (error) => {
          console.error('Could not load user tickets', error);
        }
      );
    }
  }
  selectMatch(match: Match): void {
    this.selectedMatch = match;
}


}
