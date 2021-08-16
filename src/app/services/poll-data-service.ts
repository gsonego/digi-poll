import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
      .valueChanges({ idField: 'id' })
  }

  getPoll(id: string) {
    return this.firestore
      .doc(`polls/${id}`)
      .snapshotChanges();
  }

  getPollByUser(userId: string){
    return this.firestore
      .collection('polls', ref => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }
}
