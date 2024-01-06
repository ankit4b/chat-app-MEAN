import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  notificationData = [];
  currentUser: any;
  showNotificationPopup: boolean = false;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chatService.notifications.subscribe((res) => {
      if (res) {
        this.notificationData = res;
        console.log('this.notificationData :', this.notificationData);
      }
    });

    this.chatService.userDetails.subscribe((res) => {
      this.currentUser = res;
      console.log('this.currentUser : ', this.currentUser);
    });
  }

  logout() {
    this.authService.logout();
  }

  openModal() {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: '350px',
      data: {
        user: this.currentUser,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  toggleNotification() {
    this.showNotificationPopup = !this.showNotificationPopup;

    // Reset notification count when the popup is opened
    // this.resetNotification();
  }

  resetNotification() {
    if (this.showNotificationPopup) {
      this.notificationData = [];
    }
  }

  handleNotificationClick(notification: any) {
    console.log('Notification clicked : ', notification);

    this.chatService.selectedUser.next(notification.sender);
    this.chatService.fetchChatHistory(notification.chat);

    let chatData = this.chatService.chatList.value;

    const index = chatData.findIndex((item: any) => {
      console.log('item : ', item);
      console.log('newChatData : ', notification.chat);
      return item._id === notification.chat._id;
    });

    console.log('index : ', index);

    if (index !== -1) {
      console.log(`It's present ${chatData[index]}`);
    } else {
      // If id is not present, push a new element
      chatData.push(notification.chat);
      console.log(`Added new element : ${this.chatService.chatList.value}`);
    }

    this.resetNotification();
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const notificationIcon = document.getElementById('notification-icon');
    const notificationPopup = document.getElementById('notification-popup');

    if (
      !notificationIcon?.contains(event.target as Node) &&
      !notificationPopup?.contains(event.target as Node)
    ) {
      this.showNotificationPopup = false;
    }

    // this.resetNotification();
  }

  handleNotificationPopupClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent document click from being triggered
  }
}
