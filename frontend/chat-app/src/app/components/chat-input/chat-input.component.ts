import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {
  message = new FormControl('', [Validators.required]);

  constructor(private chatService: ChatService){}

  sendMessage(){
    if(this.message.value){
      this.chatService.sendMessage(this.message.value)
      this.message.setValue("");
    }
  }

  typing(){
    this.chatService.sendTyping();
  }

}
