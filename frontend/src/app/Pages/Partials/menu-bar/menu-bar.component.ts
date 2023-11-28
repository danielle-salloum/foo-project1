import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogInServiceService } from 'src/app/Service/LogIn/log-in-service.service';
import { LoggedInService } from 'src/app/Service/loggenIn/logged-in.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  constructor(
    private router: Router,
    private loggedInService: LoggedInService,
    public loginService: LogInServiceService,
  ) { }

  openLogin() {
    // console.log("Open Log in PopUp")
    this.loginService.toggleLogin();
  }

  navigateToCart() {
    // console.log("in the navigate to cart function")
    this.loggedInService.authStatus.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        // console.log("logged in: ", loggedIn)
        this.router.navigateByUrl('/cart');
      } else {
      //  console.log("not logged in: ", loggedIn)
        this.openLogin();
      }
    });
  }
  scrollToFooter() {
      const footerElement = document.getElementById('footer');
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: 'smooth' });
      }
  } 

}
