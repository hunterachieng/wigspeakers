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
    if (sectors.private || sectors.public || sectors.ngo || sectors.self || sectors.university || sectors.internationa) {
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.sector.professionalDriver && sectors.private ||
          it.sector.professionalRider && sectors.public ||
          it.sector.plantOperator && sectors.ngo ||
          it.sector.conductor&& sectors.self ||
          it.sector.captain && sectors.university ||
          it.sector.saccoManager && sectors.international
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
          it.domain.citizen && domain.citizen ||
          it.domain.climate && domain.climate ||
          it.domain.defence && domain.defence ||
          it.domain.emergency && domain.emergency ||
          it.domain.energy && domain.energy ||
          it.domain.environment && domain.environment ||
          it.domain.food && domain.food ||
          it.domain.manufacturing && domain.manufacturing ||
          it.domain.policy && domain.policy ||
          it.domain.public && domain.public ||
          it.domain.smart && domain.smart ||
          it.domain.sustainable && domain.sustainable ||
          it.domain.transportation && domain.transportation

      );
    }
  }
  filterSpeakersByArea(area) {

    let filter = false;
    for (const d in area) {
      if (area[d] === true) {
        filter = true;
        break;
      }
    }

    this.filteredSpeakersList.forEach(sk => {
      if (!sk.newareas) {
        console.log('No areas');
        console.log(sk);
      }
    });

    if (filter) {
      this.filteredSpeakersList = this.filteredSpeakersList.filter(
        it =>
          it.newareas.research && area.research ||
          it.newareas.geosoft && area.geosoft ||
          it.newareas.webmapping && area.webmapping ||
          it.newareas.geoopendata && area.geoopendata ||
          it.newareas.remote && area.remote ||
          it.newareas.gis && area.gis ||
          it.newareas.ethical && area.ethical ||
          it.newareas.geocloud && area.geocloud ||
          it.newareas.geoprogramming && area.geoprogramming ||
          it.newareas.datavis && area.datavis ||
          it.newareas.dataJournalism && area.dataJournalism ||
          it.newareas.strategic && area.strategic ||
          it.newareas.geodata && area.geodata ||
          it.newareas.entrepreneurship && area.entrepreneurship ||
          it.newareas.innovation && area.innovation
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
