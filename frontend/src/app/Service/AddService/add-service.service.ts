import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddServiceService {

  private showPopUpSubject = new BehaviorSubject<boolean>(false);

  public showPopUp$: Observable<boolean> = this.showPopUpSubject.asObservable();

  togglePopUp() {
    this.showPopUpSubject.next(!this.showPopUpSubject.value);
  }
  
}
