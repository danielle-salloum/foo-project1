// topper.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInServiceService } from 'src/app/Service/LogIn/log-in-service.service';
import { FontService } from 'src/app/Service/fontService/font.service';
import { LoggedInService } from 'src/app/Service/loggenIn/logged-in.service';
import { TokenServiceService } from 'src/app/Service/tokenService/token-service.service';
import { TranslationService } from 'src/app/Service/translationService/translation.service';

@Component({
  selector: 'app-topper-bar',
  templateUrl: './topper-bar.component.html',
  styleUrls: ['./topper-bar.component.css'],
  // Declare the service as public
  providers: [LogInServiceService]
})
export class TopperBarComponent implements OnInit {

  constructor(
    public loginService: LogInServiceService,
    private loggedin: LoggedInService,
    private router: Router,
    private token: TokenServiceService,
    public fontService: FontService,
    private translationService: TranslationService
  ) { }
  
  //Popup
  public loggedIn: boolean = false;

  openLogin() {
    this.loginService.toggleLogin();
  }

  ngOnInit() {
    this.loggedin.authStatus.subscribe(value => this.loggedIn = value)
  }

  //Logout
  logout(event: MouseEvent) {
    event.preventDefault();
    this.loggedin.changeAuthStatus(false);
    this.router.navigateByUrl('/');
    this.token.remove();
  }
  
  //font size increment:
  increaseFontSize(): void {
    this.fontService.increaseFontSize(2); // You can adjust the increment value as needed
  }
  decreaseFontSize(): void {
     this.fontService.decreaseFontSize(2); // You can adjust the increment value as needed
  }
  
  //language translate:
  // switchLanguage(): void {
  //   const currentLang = this.translationService.getCurrentLanguage();
  //   const newLang = currentLang === 'en' ? 'ar' : 'en';
  //   this.translationService.setLanguage(newLang);
  // }
  // topper.ts
  switchLanguage(lang: string): void {
  this.translationService.setLanguage(lang);
}

}
