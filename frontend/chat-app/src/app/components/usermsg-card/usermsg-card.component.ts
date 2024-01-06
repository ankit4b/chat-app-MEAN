import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-usermsg-card',
  templateUrl: './usermsg-card.component.html',
  styleUrls: ['./usermsg-card.component.scss'],
})
export class UsermsgCardComponent implements OnInit {
  @Input() userChat: any;
  @Input() isSelected = false;
  @Output() cardClicked = new EventEmitter<void>();
  currentChat: any;
  selectedUser: any;
  isGroupChat: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.userDetails.subscribe((res: any) => {
      if (res) {
        this.currentChat = res;
        // console.log("this.currentChat : ",this.currentChat)
        if (this.userChat.isGroupChat === 'true') {
          this.isGroupChat = true;
          this.selectedUser = this.userChat;
        }
      }
    });
  }

  selectCard(): void {
    this.cardClicked.emit();
  }

  getOtherUser(users: any) {
    this.selectedUser =
      users[0]._id === this.currentChat._id ? users[1] : users[0];
    return this.selectedUser;
  }

  getChats() {
    this.selectCard();
    this.chatService.selectedUser.next(this.selectedUser);
    this.chatService.fetchChatHistory(this.userChat);
  }
}
