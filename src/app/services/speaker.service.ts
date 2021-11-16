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
  featureCollection = '{"type":"FeatureCollection","features":[';

  private db: AngularFirestore;
  constructor(db: AngularFirestore) {
    this.db = db;
    const spSubs = this.subscribeToSpeakers().subscribe(res => {
      this.speakersList = [];
      res.forEach(sp => {
        // don't include the speaker if no name
        if (sp.name !== '') {
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
          if (sp.geoFeature) {
            this.featureCollection = this.featureCollection + JSON.stringify(sp.geoFeature) + ',';
          }
          this.speakersList.push(sp);
        }
      });
      this.filteredSpeakersList = this.speakersList;
      spSubs.unsubscribe();
      console.log('Speakers ready');
      this.featureCollection = this.featureCollection + ']}';
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
    if (search && search !== '' && search !== ' ') {
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.name.toLowerCase().includes(search) ||
          it.bio.toLowerCase().includes(search) ||
          it.position.toLowerCase().includes(search)
      );
    }
    // if no results get all speakers again
    /*     if (this.filteredSpeakersList.length === 0) {
          this.filteredSpeakersList = this.speakersList;
        } */
  }

  filterSpeakersBySector(sectors) {
    // at least one sector checked
    if (sectors.professionalDriver || 
      sectors.professionalRider || 
      sectors.plantOperator || 
      sectors.conductor || 
      sectors.captain || 
      sectors.saccoManager ||
      sectors.stageManager|| 
      sectors.clerk || 
      sectors.courierProvider || 
      sectors.driverInstructor || 
      sectors.conductorInstructor || 
      sectors.mechanic || 
      sectors.civilEng || 
      sectors.urban || 
      sectors.trainer || 
      sectors.leadandMentor || 
      sectors.confSpeaker ||
      sectors.policy ||
      sectors.telphoneDev ||
      sectors.autoManufacture ) {

        
        
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.sector.professionalDriver && sectors.professionalDriver ||
          it.sector.professionalRider && sectors.professionalRider ||
          it.sector.plantOperator && sectors.plantOperator||
          it.sector.conductor&& sectors.conductor||
          it.sector.captain && sectors.captain ||
          it.sector.saccoManager && sectors.saccoManager ||
          it.sector.stageManager && sectors.stageManager ||
          it.sector.clerk && sectors.clerk ||
          it.sector.courierProvider && sectors.courierProvider ||
          it.sector.driverInstructor && sectors.driverInstructor ||
          it.sector.conductorInstructor && sectors.conductorInstructor ||
          it.sector.mechanic && sectors.mechanic ||
          it.sector.civilEng && sectors.civilEng ||
          it.sector.urban && sectors.urban ||
          it.sector.trainer && sectors.trainer ||
          it.sector.leadandMentor && sectors.leadandMentor ||
          it.sector.confSpeaker && sectors.confSpeaker ||
          it.sector.policy && sectors.policy||
          it.sector.telphoneDev && sectors.telphoneDev ||
          it.sector.autoManufacture && sectors.autoManufacture 
         
      );
    }
  }
  filterSpeakersByDomain(domain) {
    // at least one domain checked
    let filter = false;

    for (const d in domain) {
      if (domain[d]) {
        filter = true;
        break;
      }
    }

    /*    // check if missing domains
     this.filteredSpeakersList.forEach (sk => {
          if (!sk.domain) {
            console.log('No domain');
            console.log(sk);
          }
        }); */

    if (filter) {
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.domain. publicTransport && domain. publicTransport||
          it.domain.onlineTaxi&& domain.onlineTaxi ||
          it.domain.courierService && domain.courierService ||
          it.domain.research && domain.research||
          it.domain.roads && domain.roads||
          it.domain.safety && domain.safety ||
          it.domain.skills && domain.skills||
          it.domain.advocacy && domain.advocacy ||
          it.domain.mentorship && domain.mentorship ||
          it.domain.speaker && domain.speaker||
          it.domain.academia && domain.academia ||
          it.domain.manufacturer && domain.manufacturer ||
          it.domain.software && domain.software ||
          it.domain.innovation && domain.innovation

      );
    }
  }
  
  filterSpeakersByYears(years) {
    // at least one sector checked
    if (years && years !== '' && years !== ' ') {
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.years === years
      );
    }
  }

  filterSpeakersByLevel(level) {
    // at least one sector checked
    if (level && level !== '' && level !== ' ') {
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.level === level
      );
    }
  }

  filterSpeakersByLanguages(lan) {
    // at least one sector checked
    if (lan && lan !== '' && lan !== ' ') {
      // lan.forEach(l => {
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.languages.includes(lan)
      );
      //  });
    }
  }
}
