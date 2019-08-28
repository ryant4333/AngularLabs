import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

const users = [
  {name: "ryant4333@hotmail.com", pwd: "1234"},
  {name: "RyanCTaylor95@gmail.com", pwd: "1234"},
  {name: "ryan.taylor5@griffithuni.edu.au", pwd: "1234"}
]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  firstName: string;
  pass: string;
  showErr: boolean;


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
      }
    }
    this.showErr = true;
  }

}
