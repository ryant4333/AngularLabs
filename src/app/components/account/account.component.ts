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
  show = true;

  newUserInfo: newUser = {username: 'name', email: 'email', pwd:'pass'};
  
  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  public newUserFunc() {
    this.httpClient.post(BACKEND_URL + 'addUser', this.newUserInfo, httpOptions)
    .subscribe((data: any) => {
      if (data.gen) {
        console.log("NEW USER ADDED");
      } else {
        console.log("Error");
      }
    });
  }
}
