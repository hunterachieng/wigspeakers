import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Speaker } from '../speaker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  collection = 'speakers';
  speakersList: Speaker[];

  private db: AngularFirestore;
  constructor(db: AngularFirestore) {
    this.db = db;
    const spSubs = this.subscribeToSpeakers().subscribe(res => {
      this.speakersList = [];
      res.forEach(sp => {
        if (sp.name !== '') {
          this.speakersList.push(sp);
        }
      });
      spSubs.unsubscribe();
    });
  }

  subscribeToSpeakers(): Observable<Speaker[]> {
    return this.db.collection<Speaker>(this.collection).valueChanges({ idField: 'id' });
  }

  getSpeakerById(speakerId: string): Observable<Speaker> {
    return this.db
      .collection(this.collection)
      .doc<Speaker>(speakerId)
      .valueChanges();
  }


}
