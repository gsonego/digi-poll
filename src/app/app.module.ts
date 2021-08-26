import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PollComponent } from './pages/poll/poll.component';
import { MyPollsComponent } from './pages/my-polls/my-polls.component';
import { HeaderComponent } from './shared/header/header.component';
import { HorizontalBannerComponent } from './shared/horizontal-banner/horizontal-banner.component';

import { environment } from 'src/environments/environment';
import { AddPollComponent } from './pages/add-poll/add-poll.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PollCardComponent } from './shared/poll-card/poll-card.component';
import { EditPollComponent } from './pages/edit-poll/edit-poll.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PollComponent,
    HeaderComponent,
    MyPollsComponent,
    HorizontalBannerComponent,
    AddPollComponent,
    PollCardComponent,
    EditPollComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({  
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
