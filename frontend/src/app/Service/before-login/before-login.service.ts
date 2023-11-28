import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenServiceService } from '../tokenService/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate{

  constructor(
    private token: TokenServiceService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
    return !this.token.loggedIn();
  }
}
