import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PollComponent } from './pages/poll/poll.component';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';
import { AddPollComponent } from './pages/add-poll/add-poll.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "poll/:pollId", component: PollComponent },
  { path: "my-polls", component: MyPollsComponent },
  { path: "add-poll", component: AddPollComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
