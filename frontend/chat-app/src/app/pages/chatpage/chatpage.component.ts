import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss'],
})
export class ChatpageComponent implements OnInit {
  userDetails: any;
  selectedUser: any;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.chatService.socketConnection();
    }

    this.chatService.userDetails.subscribe((res: any) => {
      if (res) {
        this.userDetails = res;
        console.log('Chat page - user details --> ', this.userDetails);
      }
    });

    this.chatService.selectedUser.subscribe((res: any) => {
      console.log('inside selectedUser : ', res);
      if (res) {
        console.log('selectedUser : ', this.selectedUser);
        this.selectedUser = res;
      }
    });
  }
}
