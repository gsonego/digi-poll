import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PollComponent } from './poll/poll.component';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';
import { HeaderComponent } from './shared/header/header.component';

import { HorizontalBannerComponent } from './shared/horizontal-banner/horizontal-banner.component';

import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';
import { AddPollComponent } from './pages/add-poll/add-poll.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PollComponent,
    HeaderComponent,
    MyPollsComponent,
    HorizontalBannerComponent,
    AddPollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
