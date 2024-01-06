import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ChatpageComponent } from './pages/chatpage/chatpage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersSidebarComponent } from './components/users-sidebar/users-sidebar.component';
import { ChatsComponent } from './components/chats/chats.component';
import { UsermsgCardComponent } from './components/usermsg-card/usermsg-card.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { UsersSidebarHeaderComponent } from './components/users-sidebar-header/users-sidebar-header.component';
import { HeaderComponent } from './components/header/header.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ChatpageComponent,
    LoginComponent,
    SignupComponent,
    UsersSidebarComponent,
    ChatsComponent,
    UsermsgCardComponent,
    ChatInputComponent,
    ChatHistoryComponent,
    UsersSidebarHeaderComponent,
    HeaderComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }