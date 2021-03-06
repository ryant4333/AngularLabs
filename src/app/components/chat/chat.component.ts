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
  public loggedUser;
  public newGroupObj = {groupName: ''};
  public newChannelObj = {chanelName: '', parentName: ''}
  public newUserObj = {nUserName: '', parentChannel: '', parentGroup: ''}


  ngOnInit() {
    this.loggedUser = sessionStorage.getItem("user");

    this.updateData()
  }

  public updateData() {
    this.httpClient.post(BACKEND_URL + '/getGroups', httpOptions)
    .subscribe((data: any) => {
      this.groupsData = data.groupsData;
      console.log(this.groupsData);
    })
  }

  public newGroupFunc() {
    console.log(this.newGroupObj);
    this.httpClient.post(BACKEND_URL + '/addGroup', this.newGroupObj, httpOptions)
    .subscribe((data: any) => {
      console.log(data.gen)
      if (!data.gen) {
        alert("This group already exists!")
      }
    })
    this.updateData();
  }

  public delGroupFunc(group) {
    this.httpClient.post(BACKEND_URL + '/removeGroup', group, httpOptions)
    .subscribe((data: any) => {
      console.log(data.gen)
      if(data.gen) {
        alert("Group deleated!")
      }
      this.updateData();
    })
  }

  public newChannelFunc() {
    console.log(this.chosenGroup)
    this.newChannelObj.parentName = this.chosenGroup.groupName;
    this.httpClient.post(BACKEND_URL + '/addChannel', this.newChannelObj, httpOptions)
    .subscribe((data: any) => {
      console.log(data.gen)
      if(data.gen) {
        alert("Channel Created!")
      }
    })
    this.updateData();
  }

  public newUserFunc() {
    this.newUserObj.parentChannel = this.chosenChannel.channelName;
    this.newUserObj.parentGroup = this.chosenGroup.groupName;
    console.log("NEWUSEROBJ")
    this.httpClient.post(BACKEND_URL + '/channelAddUser', this.newUserObj, httpOptions)
    .subscribe((data: any) => {
      if(data.gen) {
        alert("New User added to channel!")
      }
    })
    this.updateData();
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
