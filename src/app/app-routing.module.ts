import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PollComponent } from './poll/poll.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "user", component: UserComponent },
  { path: "poll", component: PollComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
