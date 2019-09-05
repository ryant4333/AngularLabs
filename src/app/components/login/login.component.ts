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


<<<<<<< HEAD
  constructor(private router: Router) {
    this.showErr = false;
  }

  ngOnInit() {
  }

  itemClicked() {
    for (let i = 0; i < users.length; i++) {
      if (this.firstName == users[i].name && this.pass == users[i].pwd) {
        console.log("Success")
        this.router.navigateByUrl('/account');
=======
export class LoginComponent implements OnInit {
  loginInfo: loginInfo = {username: 'Username', pwd:"Password"};


  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {}

  public loginfunc() {
    this.httpClient.post(BACKEND_URL + '/login', this.loginInfo, httpOptions)
    .subscribe((data: any) => {
      
      //Shows sent user data
      // alert(JSON.stringify(this.loginInfo));
      
      if (data.ok) {
        let user = this.loginInfo.username
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("user", user);
        if (data.role == "super") {
          this.router.navigateByUrl('account');
        } else {
          this.router.navigateByUrl('chat');
        }
      } else {
        //Data not ok
        alert('Sorry, invalid')
>>>>>>> c98bfdc1d6828eebba6df992747d46b8f6da29d6
      }
    });
  }
}
