import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollDataService {
  private itemDoc: AngularFirestoreDocument<Poll>;
  item: Observable<Poll | undefined>;
  
  constructor(private firestore: AngularFirestore) {
   }

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

  getPollData(id: string) {
    this.itemDoc = this.firestore.doc<Poll>(`polls/${id}`);
    this.item = this.itemDoc.valueChanges();

    return this.item;

    // return this.firestore
    //   .doc(`polls/${id}`)
    //   .snapshotChanges();
  }  

  getPollByUser(userId: string){
    return this.firestore
      .collection('polls', ref => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  addPoll(newPoll: any){
    // var pollRef: AngularFirestoreCollection<Poll> = this.firestore.collection("/polls");

    // var myNewPoll: Poll = {
    //   id: "",
    //   title: "",
    //   creation: "",
    //   userId: "",
    //   votes: 0,
    //   optionCount: 2
    // }

    // pollRef.add(myNewPoll)
    // .then((result) => {
    //   result.id
    // })

    return this.firestore
      .collection('polls')
      .add(newPoll);    
  }

  deletePoll(pollId: string) {
    return this.firestore
      .doc<Poll>(`polls/${pollId}`)
      .delete();
  }
}
