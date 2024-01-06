import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  isCurrentUser: boolean = false;

  constructor(
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data : ', data.user);
    this.user = data.user;
    this.isCurrentUser =
      this.user._id === this.chatService.userDetails.value._id ? true : false;
  }

  ngOnInit(): void {
    // this.user = this.chatService.userDetails.value;
  }
}
