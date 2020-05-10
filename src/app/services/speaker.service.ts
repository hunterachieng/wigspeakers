import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Speaker } from '../speaker';
import { Observable } from 'rxjs';

import * as mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingService = mbxGeocoding(
  { accessToken: 'pk.eyJ1IjoiYWlkYW1vbmZvcnQiLCJhIjoiY2locnFpdmJkMDAwd3cxa3BsbzR1bjcycSJ9.qV_JJ8BMW67X5BoV1gCcTQ' });


@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  collection = 'speakers';
  speakersList: Speaker[];
  filteredSpeakersList: Speaker[];

  private db: AngularFirestore;
  constructor(db: AngularFirestore) {
    this.db = db;
    console.log('Speakers query');
    const spSubs = this.subscribeToSpeakers().subscribe(res => {
      this.speakersList = [];
      res.forEach(sp => {
        // don't include the speaker if no name
        if (sp.name !== '') {

          if (!sp.sector) {
            console.log(sp);
          }

          // if geofeature is null, call mapbox forward geocoging to get it
          if (sp.geoFeature == null) {
            const country = sp.country;
            const city = sp.city;
            let textQuery = '';
            if (country || city) {
              textQuery = city + ',' + country;

              console.log('--- Text query');
              console.log(textQuery);

              geocodingService.forwardGeocode({
                query: textQuery,
                limit: 1
              }).send()
                .then(response => {
                  const match = response.body;
                  console.log('--- New Match');
                  console.log(match);
                  if (match.features && match.features.length === 1) {
                    sp.geoFeature = match.features[0];
                    this.updateFeatureWithId(sp.id, sp.geoFeature);
                  }
                })
                .catch(error => {
                  console.log('---  Error');
                  console.log(error);
                });
            }
          }
          this.speakersList.push(sp);
        }
      });
      this.filteredSpeakersList = this.speakersList;
      spSubs.unsubscribe();
      console.log('Speakers ready');
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

  updateFeatureWithId(speakerId: string, fea: any) {
    return this.db
      .collection(this.collection)
      .doc<Speaker>(speakerId)
      .update({
        geoFeature: fea
      });
  }

  filterSpeakersByText(search) {
    this.filteredSpeakersList = this.speakersList.filter(
      it =>
        it.name.toLowerCase().includes(search) ||
        it.bio.toLowerCase().includes(search) ||
        it.position.toLowerCase().includes(search)

    );
    // if no results get all speakers again
    if (this.filteredSpeakersList.length === 0) {
      this.filteredSpeakersList = this.speakersList;
    }
  }

  filterSpeakersBySector(sectors) {
    this.filteredSpeakersList = this.speakersList.filter(
      it =>
        it.sector.private && sectors.private  ||
        it.sector.public && sectors.public  ||
        it.sector.ngo && sectors.ngo  ||
        it.sector.self && sectors.self  ||
        it.sector.university && sectors.university  ||
        it.sector.international && sectors.international
      );
    // if no results get all speakers again
    if (this.filteredSpeakersList.length === 0) {
      this.filteredSpeakersList = this.speakersList;
    }
  }

}
