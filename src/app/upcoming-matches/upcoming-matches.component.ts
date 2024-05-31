import { Component, OnInit, OnDestroy } from '@angular/core';
import { Match } from '../models/match';
import { MatchService } from '../services/match.service';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { UserTickets } from '../models/userTicket';
import { forkJoin, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent implements OnInit, OnDestroy {
  matches: Match[] = [];
  userTickets: UserTickets[] = [];
  errorMessage: string = '';
  selectedMatch: Match | null = null;
  public UserID: string = "";
  private destroy$ = new Subject<void>();

  constructor(
    private matchService: MatchService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.UserID = "";
    this.userStore.getUserIdFromStore().subscribe(
      (userId) => {
        this.UserID = this.auth.getUserIdFromToken();
        if (this.UserID) {
          this.loadData();
        }
        else{
          this.reloadPage();
        }
      },
      (error) => {
        this.errorMessage = 'Could not retrieve user ID';
        console.error('Error retrieving user ID', error);
      }
    );

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    forkJoin({
      matches: this.matchService.getUpcomingMatches(),
      userTickets: this.matchService.getUserOrders(this.UserID)
    }).subscribe(
      ({ matches, userTickets }) => {
        this.matches = matches;
        this.userTickets = userTickets;

      },
      (error) => {
        this.errorMessage = 'Could not load data';
        console.error('Error loading data', error);
      }
    );
  }

  private reloadPage(): void {
    window.location.reload();
  }

  selectMatch(match: Match): void {
    this.selectedMatch = match;
  }
}
