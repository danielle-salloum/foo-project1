import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenServiceService } from '../tokenService/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  constructor(private token: TokenServiceService) { }

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());

  authStatus = this.loggedIn.asObservable();
  
  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value)
  }

}
