import { Component, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-users-sidebar-header',
  templateUrl: './users-sidebar-header.component.html',
  styleUrls: ['./users-sidebar-header.component.scss'],
})
export class UsersSidebarHeaderComponent {
  showFiller = false;
  userData: any = [];

  constructor(
    private apiService: ApiService,
    private chatService: ChatService
  ) {}

  onInput(event: any) {
    const value = event.target.value;

    this.apiService.searchByName(value).subscribe(
      (response) => {
        // Handle the API response
        console.log('API response:', response);
        if (response) {
          this.userData = response;
        }
      },
      (error) => {
        // Handle API error
        console.error('API error:', error);
      }
    );
  }

  startConversation(userId: any) {
    this.userData = null;
    this.apiService.chatAccess(userId).subscribe((res: any) => {
      console.log('Start conv --> ', res);
      this.getChats(res);
    });
  }

  getOtherUser(users: any) {
    let selectedUser =
      users[0]._id === this.chatService.userDetails.value._id
        ? users[1]
        : users[0];
    return selectedUser;
  }

  getChats(newChatData: any) {
    // this.selectCard();
    this.chatService.selectedUser.next(this.getOtherUser(newChatData.users));
    this.chatService.fetchChatHistory(newChatData);

    let chatData = this.chatService.chatList.value;

    const index = chatData.findIndex((item: any) => {
      console.log('item : ', item);
      console.log('newChatData : ', newChatData);
      return item._id === newChatData._id;
    });

    console.log('index : ', index);

    if (index !== -1) {
      console.log(`It's present ${chatData[index]}`);
    } else {
      // If id is not present, push a new element
      chatData.push(newChatData);
      console.log(`Added new element : ${this.chatService.chatList.value}`);
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const searchBox = document.getElementById('search-box');
    const userList = document.getElementById('user-list');

    if (
      !searchBox?.contains(event.target as Node) &&
      !userList?.contains(event.target as Node)
    ) {
      this.userData = [];
    }
  }

  handleSearchBoxClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent document click from being triggered
  }
}
