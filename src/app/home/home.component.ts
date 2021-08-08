import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Poll } from '../models/poll.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topPolls: Observable<any>;
  recentPolls: Observable<any>;  

  constructor(private firestore: AngularFirestore) {
    this.topPolls = firestore
      .collection('polls', ref => ref.orderBy('votes', 'desc').limit(5))
      .valueChanges();

      this.recentPolls = firestore
      .collection('polls', ref => ref.orderBy('creation', 'desc').limit(5))
      .valueChanges(); 
   }

  ngOnInit(): void {
  }

}
