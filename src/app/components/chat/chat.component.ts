import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  groupsData = [];
  public chosenGroup;
  public chosenChannel;


  ngOnInit() {
    this.httpClient.post(BACKEND_URL + '/getGroups', httpOptions)
    .subscribe((data: any) => {
      this.groupsData = data.groupsData;
      console.log(this.groupsData);
    })
  }

  public chooseGroup(group) {
    //If chosen group is already group do nothing, else change chosen group
    if (this.chosenGroup === group) return;
    this.chosenGroup = group;
    this.chosenChannel = null;
  }

  public chooseChannel(channel) {
    if (this.chosenChannel === channel) return;
    this.chosenChannel = channel;
  }
}
