import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userId$ = new BehaviorSubject<string>("");
  constructor() {
    
   }

  public getUserIdFromStore(){
    return this.userId$.asObservable();
  }
  public setStoreFromStore(user : string){
    this.userId$.next(user);
  }

}
