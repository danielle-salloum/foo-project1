import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { TokenServiceService } from 'src/app/Service/tokenService/token-service.service';

interface SignUpError {
  email?: string[];
  name?: string[];
  password?: string[];
}
@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent {

  constructor(
    private auth: AuthService,
    private token: TokenServiceService,
    private router: Router
  ) { }

  //signup
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  }

  onSubmit() {
    console.log(this.form);
    this.auth.signup(this.form).subscribe(
      res =>this.handleResponse(res),
      error => this.handleError(error)
    );
  }

  public error: SignUpError = {};

  handleError(error: any) {
    this.error = error.error.errors;
  }

    handleResponse(res: any) {
    this.token.handle(res.access_token);
    this.router.navigateByUrl('/cart');
    }
  
}
