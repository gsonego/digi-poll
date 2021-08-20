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
      .collection('polls', ref => ref.orderBy('votes', 'desc').limit(8))
      .valueChanges({ idField: 'id' });
  }

  getRecentPolls() {
    return this.firestore
      .collection('polls', ref => ref.orderBy('creation', 'desc').limit(8))
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
  }  

  getPollByUser(userId: string){
    return this.firestore
      .collection('polls', ref => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  addPoll(newPoll: any){
    return this.firestore
      .collection('polls')
      .add(newPoll);    
  }

  editPoll(pollId: string, editedPoll: any){
    return this.firestore
      .doc(`polls/${pollId}`)
      .update(editedPoll);  
  }

  deletePoll(pollId: string) {
    return this.firestore
      .doc<Poll>(`polls/${pollId}`)
      .delete();
  }

  activatePoll(pollId: string) {
    return this.firestore
      .doc<Poll>(`polls/${pollId}`)
      .update({ active: true });  
  }
}
