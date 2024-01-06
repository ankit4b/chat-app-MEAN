import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, AfterViewInit {
  currentUser: any;
  chatHistory: any;
  selectedUser: any;
  isGroupChat: boolean = false;
  isTyping: boolean = false;

  @ViewChild('chatHistoryContainer', { static: false })
  chatHistoryContainer!: ElementRef;

  constructor(private chatService: ChatService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.chatService.selectedUser.subscribe((res: any) => {
      if (res) {
        console.log('selectedUser : ', res);
        this.selectedUser = res;
        if (this.selectedUser.isGroupChat === 'true') {
          this.isGroupChat = true;
        }
      }
    });

    this.chatService.userDetails.subscribe((res: any) => {
      if (res) {
        this.currentUser = res;
      }
    });

    this.chatService.chatHistory.subscribe((res: any) => {
      if (res) {
        this.chatHistory = res;
        // console.log("this.chatHistory : ",this.chatHistory)
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      }
    });

    this.chatService.getMessage().subscribe((newMessageReceived: any) => {
      console.log('inside chats component : ', newMessageReceived);
      console.log(
        'this.chatService.selectedChatCompare :',
        this.chatService.selectedChatCompare
      );
      if (
        !this.chatService.selectedChatCompare ||
        this.chatService.selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // Give Notification
        console.log('--> if', this.chatService.notifications.value);
        this.chatService.notifications.next([
          ...this.chatService.notifications.value,
          newMessageReceived,
        ]);
        console.log('Get Notification', this.chatService.notifications.value);
      } else {
        console.log('--> else');
        this.chatService.chatHistory.next([
          ...this.chatService.chatHistory.value,
          newMessageReceived,
        ]);
        // console.log("this.chatHistory : ",this.chatHistory)
      }
    });

    this.chatService.checkTyping().subscribe((res: any) => {
      console.log('checkTyping res : ', res);
      this.isTyping = res;
      this.scrollToBottom();
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    // console.log("this.chatHistoryContainer : ",this.chatHistoryContainer)
    const element = this.chatHistoryContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
    // element.scrollTop = element.scrollHeight - element.clientHeight;
    // console.log("element.scrollTop : ",element.scrollTop)
    // console.log("element.scrollHeight : ",element.scrollHeight)
  }

  getUserStatus(user: any) {
    return this.currentUser._id === user._id ? 'sender' : 'receiver';
  }

  openModal() {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: '350px',
      data: {
        user: this.selectedUser,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
