import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

import { newUser } from './newUser';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  newUserInfo: newUser = {username: 'name', email: 'email', pwd:'pass'};
 
  constructor(private router: Router, private httpClient: HttpClient) { }

  userData =[];
  loggedUser;
  userRole;
  showUsers=true;

  ngOnInit() {
    //Post to server to get list of users
    this.httpClient.post(BACKEND_URL + '/getUsers', httpOptions)
    .subscribe((data: any) => {
      console.log(data.data)
      this.userData = data.data;
    })

    this.loggedUser = sessionStorage.getItem("user");
    this.userRole = sessionStorage.getItem("role");


  }
  
  public newUserFunc() {
    this.httpClient.post(BACKEND_URL + '/addUser', this.newUserInfo, httpOptions)
    .subscribe((data: any) => {
      alert(JSON.stringify(this.newUserInfo));
      if (data.gen) {
        console.log("NEW USER ADDED");
      } else {
        alert("Unable to generate User, User alread exists")
        console.log("Error");
      }
    });
  }
}
