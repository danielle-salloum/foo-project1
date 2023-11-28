import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenServiceService } from '../tokenService/token-service.service';
import { LogInServiceService } from '../LogIn/log-in-service.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate{

  constructor(
    private token: TokenServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LogInServiceService
  ) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
  //   if (this.token.loggedIn()) {
  //     return true;
  //   }
  //   else {
  //     // If not logged in, store the intended route and navigate to login
  //     const intendedRoute = state.url;
  //     this.router.navigate(['/login'], { queryParams: { redirect: intendedRoute } });
  //     return false;
  //   }
  // }
  
  //Popup
  public loggedIn: boolean = false;

  openLogin() {
    this.loginService.toggleLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.token.loggedIn()) {
      return true;
    }
    else {
      this.openLogin();
      return false;
    }
  }
}
