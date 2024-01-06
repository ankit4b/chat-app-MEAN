import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private apiService: ApiService, private authService: AuthService, private chatService: ChatService, private router: Router){}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(){
    if( this.email.status === "VALID" && this.password.status === "VALID"){
      console.log("email : ",this.email)  
      console.log("password : ",this.password)  

      const data = {
        "email": this.email.value,
        "password": this.password.value
      }

      this.apiService.login(data).subscribe((res: any) => {
        console.log("Login res : ", res);
        if(res){
          localStorage.setItem("user",JSON.stringify(res))
          this.chatService.userDetails.next(res);
          this.authService.setAuthToken(res.token);
          this.router.navigate(['/chat']);
        }
      }, (error)=> {
        alert(error.message)
      })
    }
  }
}
