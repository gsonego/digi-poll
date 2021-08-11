import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Poll } from '../models/poll.model';
import { PollDataService } from '../services/poll-data-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topPolls: Observable<any>;
  recentPolls: Observable<any>;

  constructor(private pollDataService: PollDataService) {
    this.topPolls = pollDataService.getTopPolls();
    this.recentPolls = pollDataService.getRecentPolls();
  }

  ngOnInit(): void {
  }

}
