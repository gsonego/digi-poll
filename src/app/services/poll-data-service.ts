import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollDataService {

  constructor(private firestore: AngularFirestore) { }

  getTopPolls() {
    return this.firestore
      .collection('polls', ref => ref.orderBy('votes', 'desc').limit(5))
      .valueChanges({ idField: 'id' });
  }

  getRecentPolls() {
    return this.firestore
      .collection('polls', ref => ref.orderBy('creation', 'desc').limit(5))
      .valueChanges()
  }

  getPoll(id: string) {
    return this.firestore
      .doc(`polls/${id}`)
      .snapshotChanges();
  }
}
