import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

import { loginInfo } from './loginInfo';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo: loginInfo = {username: 'Username', email: 'Email', pwd:"Password"};

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {}

  public loginfunc() {
    this.httpClient.post(BACKEND_URL + '/login', this.loginInfo, httpOptions)
    .subscribe((data: any) => {
      alert(JSON.stringify(this.loginInfo));
      if (data.ok) {
        console.log("HOLY SHIT ITS WORKING");
        this.router.navigateByUrl('account');
      } else {
        alert('Sorry, invalid')
      }
    });
  }
}
