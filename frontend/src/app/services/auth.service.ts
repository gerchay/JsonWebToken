import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000/api';

  constructor(private http: HttpClient, private router: Router) { }

  signUpUser = user =>  this.http.post<any>(this.URL + '/signup', user);
  signInUser = user => this.http.post<any>(this.URL + '/signin', user);
  loggedIn = () => !!localStorage.getItem('token');
  getToken = () => localStorage.getItem('token');

  logout = () =>{
    localStorage.removeItem('token');
    this.router.navigate(['/tasks']);
  }


}
