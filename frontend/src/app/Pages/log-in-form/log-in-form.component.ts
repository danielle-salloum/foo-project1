// login.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LogInServiceService } from 'src/app/Service/LogIn/log-in-service.service';
import { LoggedInService } from 'src/app/Service/loggenIn/logged-in.service';
import { TokenServiceService } from 'src/app/Service/tokenService/token-service.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {
  constructor(
    private loginService: LogInServiceService,
    private auth: AuthService,
    private token: TokenServiceService,
    private router: Router,
    private loggedin: LoggedInService,
    private route: ActivatedRoute
  ) {}

  // Popup
  showLogin: boolean = false;
  // error: string | null = null; // Initialize error as null
  error: string = '';
  

  
  ngOnInit() {
    this.loginService.showLogin$.subscribe((showLogin: boolean) => {
      this.showLogin = showLogin;
    });
  }

  closeLogin() {
    this.loginService.toggleLogin();
  }

  // Login
  public form = {
    email: null as string | null,
    password: null as string | null
  };

  onSubmit() {
    // console.log(this.form);
    this.auth.login(this.form).subscribe(
      (res) => this.handleResponse(res),
      (error) => this.handleError(error)
    );
  }

  handleError(error: any) {
    this.error = error.error.error;
    this.form.email = null;
    this.form.password = null;
  }

  handleResponse(res: any) {
    this.token.handle(res.access_token);
    this.loggedin.changeAuthStatus(true);
    this.router.navigateByUrl('/');
    this.closeLogin(); // Move closeLogin here after handling the response
  }
}
