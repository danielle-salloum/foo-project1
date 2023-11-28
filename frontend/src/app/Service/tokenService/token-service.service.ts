import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor() { }

  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  }

  handle(token: any) {
    this.set(token);
    // console.log("payload", this.isvalid())
  }

  set(token: any) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isvalid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) { 
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
       }
    }
    return false
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isvalid();
  }
  
}
