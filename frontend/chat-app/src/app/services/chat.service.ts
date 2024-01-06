import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  url: string = 'assets/data/messages.json';
  userDetails = new BehaviorSubject<any>(null);
  selectedUser = new BehaviorSubject<any>(null);
  selectedChat = new BehaviorSubject<any>(null);
  chatHistory = new BehaviorSubject<any>(null);
  notifications = new BehaviorSubject<any>([]);
  chatList = new BehaviorSubject<any>([]);

  socketConnected: boolean = false;
  ENDPOINT: string = 'http://localhost:5000';
  socket: any;
  selectedChatCompare: any;
  typing: boolean = false;

  constructor(private apiService: ApiService) {
    const data = localStorage.getItem('user');
    if (data) {
      this.userDetails.next(JSON.parse(data));
    }

    // this.socket.on("message received", (newMessageReceived:any) => {
    //   if(!this.selectedChatCompare || this.selectedChatCompare._id !== newMessageReceived.chat._id){
    //     // Give Notification
    //   }
    //   else{
    //     this.chatHistory.next([...this.chatHistory.value, newMessageReceived])
    //   }
    // })
  }

  socketConnection() {
    this.socket = io(this.ENDPOINT);
    this.socket.emit('setup', this.userDetails.value);
    this.socket.on('connection', () => {
      this.socketConnected = true;
    });
  }

  getMessage(): Observable<any> {
    console.log('inside getMessage');
    return new Observable<any>((observer) => {
      this.socket.on('message received', (newMessageReceived: any) => {
        console.log('newMessageReceived : ', newMessageReceived);
        observer.next(newMessageReceived);
      });
    });
  }

  checkTyping(): Observable<boolean> {
    console.log('inside CheckTyping');
    return new Observable<any>((observer) => {
      this.socket.on('typing', (res_id: any) => {
        if (this.selectedChat.value._id === res_id) observer.next(true);
        else observer.next(false);
      });
      this.socket.on('stop typing', () => {
        observer.next(false);
      });
    });
  }

  getChatsList() {
    // return this.http.get(this.url);
    this.apiService.fetchChatList().subscribe((data) => {
      this.chatList.next(data);
    });
  }

  fetchChatHistory(chatDetails: any) {
    console.log('chatDetails._id : ', chatDetails._id);
    this.socket.emit('join chat', chatDetails._id);
    this.selectedChat.next(chatDetails);
    this.selectedChatCompare = chatDetails;
    this.apiService.fetchChatHistory(chatDetails._id).subscribe((res: any) => {
      if (res) {
        console.log('fetchChatHistory res : ', res);
        this.chatHistory.next(res);
      }
    });
  }

  sendTyping() {
    console.log('sendTyping...:', this.selectedChat.value._id);

    if (!this.typing) {
      this.typing = true;
      this.socket.emit('typing', this.selectedChat.value._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && this.typing) {
        console.log('Stop typing');
        this.socket.emit('stop typing', this.selectedChat.value._id);
        this.typing = false;
      }
    }, timerLength);
  }

  sendMessage(message: string) {
    this.socket.emit('stop typing', this.selectedChat.value._id);
    this.typing = false;
    this.apiService
      .sendMessage(this.selectedChat.value._id, message)
      .subscribe((res: any) => {
        console.log('send msg res -> ', res);
        this.chatHistory.next([...this.chatHistory.value, res]);
        this.socket.emit('new message', res);
      });
  }
}
