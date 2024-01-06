import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ChatpageComponent } from './pages/chatpage/chatpage.component';
import { authGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path:"chat", component: ChatpageComponent, canActivate: [authGuardGuard]},
  {path:"", component: HomepageComponent},
  {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
