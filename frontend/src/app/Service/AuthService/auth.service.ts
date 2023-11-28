import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseurl = 'http://localhost:8000/api';

  signup(data: any){
    return this.http.post(`${this.baseurl}/signup`,data)
  }

  login(data: any){
    return this.http.post(`${this.baseurl}/login`,data)
  }
  
}
