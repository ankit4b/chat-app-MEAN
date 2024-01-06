import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  image: any = null;
  pic: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit() {}

  getErrorMessage() {
    if (
      this.username.hasError('required') ||
      this.email.hasError('required') ||
      this.password.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onFileSelected(event: any) {
    console.log('Event  :', event);
    // Handle file selection and update the form control's value
    this.image = (event.target as HTMLInputElement).files?.[0]
      ? (event.target as HTMLInputElement).files?.[0]
      : null;
    console.log('this.image : ', this.image);

    if (this.image) {
      const data: FormData = new FormData();
      data.append('file', this.image);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'dsqteibj6');

      console.log('data : ', data);

      this.apiService.uploadImage(data).subscribe((res: any) => {
        console.log('img upload Res : ', res);
        alert('Image uploaded');
        this.pic = res.url;
      });
    }
  }

  onSubmit() {
    if (
      this.username.status === 'VALID' &&
      this.email.status === 'VALID' &&
      this.password.status === 'VALID'
    ) {
      console.log('username : ', this.username);
      console.log('email : ', this.email);
      console.log('password : ', this.password);
      console.log('pic : ', this.pic);

      const data = {
        name: this.username.value,
        email: this.email.value,
        password: this.password.value,
        pic: this.pic,
      };

      this.apiService.register(data).subscribe(
        (res: any) => {
          console.log('Register res : ', res);
          if (res) {
            localStorage.setItem('user', JSON.stringify(res));
            this.chatService.userDetails.next(res);
            this.authService.setAuthToken(res.token);
            this.router.navigate(['/chat']);
          }
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }
}
