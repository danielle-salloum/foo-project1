import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInServiceService {

  private showLoginSubject = new BehaviorSubject<boolean>(false);

  public showLogin$: Observable<boolean> = this.showLoginSubject.asObservable();

  toggleLogin() {
    this.showLoginSubject.next(!this.showLoginSubject.value);
  }
  
}
