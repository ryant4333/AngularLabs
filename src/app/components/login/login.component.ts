import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

import { Userpwd } from './userpwd';
import { Userobj } from './userobj';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:3000';
// const users = [
//   {name: "ryant4333@hotmail.com", pwd: "1234"},
//   {name: "RyanCTaylor95@gmail.com", pwd: "1234"},
//   {name: "ryan.taylor5@griffithuni.edu.au", pwd: "1234"}
// ]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userpwd: Userpwd = {username: 'rct@griffith.com', pwd:"666"};
  userobj: Userobj = {userid: 1, username: this.userpwd.username, userbirthdate: null, userage: 100};

  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {}

  public loginfunc() {
    this.httpClient.post(BACKEND_URL + '/login', this.userpwd, httpOptions)
    .subscribe((data: any) => {
      alert(JSON.stringify(this.userpwd));
      if (data.ok) {
        console.log("HOLY SHIT ITS WORKING")
        sessionStorage.setItem('userid', this.userobj.userid.toString());
        sessionStorage.setItem('username', this.userobj.username);
        sessionStorage.setItem('userbirthdate', this.userobj.userbirthdate);
        sessionStorage.setItem('userage', this.userobj.userage.toString());
        this.httpClient.post<Userobj[]>(BACKEND_URL + '/loginafter', this.userobj, httpOptions)
        .subscribe((m:any) => {console.log(m[0]);});
        this.router.navigateByUrl('account');
      } else {
        alert('Sorry, invalid')
      }
    });
  }
}
