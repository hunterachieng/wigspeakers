import { Component, OnInit, ɵsetCurrentInjector, NgZone } from '@angular/core';
import { Speaker } from '../../speaker';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { auth, User } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/analytics';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = null;
  public model: Speaker;

  userIdToDelete = '';

  // fileToUpload: File = null;

  public otherAreaAdd = '';
  public otherDomainAdd = '';
  public otherSector = '';
  public savedTxt = '';
  public errorGDPR = '';

  public acceptedGDPR = false;

  public areasText = {
    research: 'Research / Science Please specify ...',
    geosoft: 'Geospatial Software',
    geosoftsub: {
      foss4g: 'FOSS4G (e.g. QGIS, gdal)',
      arcgis: 'ArcGIS Suite',
      mapinfo: 'Mapinfo Suite',
      cadcorp: 'Cadcorp Suite',
      fme: 'FME',
      other: 'Other (specify)',
    },
    webmapping: 'Webmapping',
    webmappingsub: {
      openlayers: 'Open Layers',
      leaflet: 'Leaflet',
      arcgis: 'ArcGIS Suite',
      d3: 'D3',
      mapbox: 'Mapbox Studio and Mapbox GL',
      other: 'Other (Specify)',
    },
    geoopendata: 'Geospatial Open Data platforms',
    geoopendatasub: {
      geonode: 'Geonode /Carto',
      arcgis: 'ArcGIS Open Data Platform',
      copernicus: 'Copernicus Open Data',
      earth: 'Earth on AWS',
      google: 'Google Open Data initiative',
    },
    remote: 'Remote Sensing & Earth Observations',
    gis: 'Geographic Information Systems',
    ethical: 'Ethical Geography',
    geocloud: 'Geospatial cloud platforms',
    geocloudsub: {
      google: 'Google Earth Engine',
      amazon: 'Amazon Web Services',
      other: 'Other (Specify)',
    },
    geoprogramming: '(Geospatial) programming / Data Science',
    geoprogrammingsub: {
      python: 'Python',
      r: 'R',
      jupyter: 'Jupyter Notebooks',
      javascript: 'Javascript',
      other: 'Other (Specify)',
    },
    datavis: 'Data Visualisation ',
    datavissub: {
      cartography: 'Cartography',
      dashboards: 'Dashboards',
      graphic: 'Graphic design',
    },
    dataJournalism: '(Geospatial) Data Journalism',
    strategic: 'Strategic Skills',
    strategicsub: {
      geospatial: 'Geospatial leadership',
      policy: 'Policy',
      gi: 'GI Implementation / Strategy',
      growth: 'Growth in the geospatial / space Industry',
    },
    geodata: 'Geospatial Data',
    geodatasub: {
      spatial: 'Spatial Data Analysis & Insight',
      location: 'Location Intelligence',
      bigdata: 'Big Data / Geospatial Data',
      opendata: 'Open Data',
    },
    entrepreneurship: 'Entrepreneurship',
    innovation: 'Innovation / New Uses of GIS data',
    innovationsub: {
      ar: 'Augmented Reality (AR)',
      vr: 'Virtual Reality (VR)',
      ml: 'Machine Learning / Artificial Intelligence',
      blockchain: 'Blockchain',
      fiveg: '5G',
      iot: 'Internet-of-Things (IoT)',
      geotrans: 'Geospatial and digital transformation',
    },
    other: 'Other'
  };

  public languages = [
    'Afrikaans',
    'Albanian',
    'Arabic',
    'Armenian',
    'Basque',
    'Bengali',
    'Bulgarian',
    'Catalan',
    'Cambodian',
    'Chinese (Mandarin)',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Estonian',
    'Fiji',
    'Finnish',
    'French',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Icelandic',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Korean',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Macedonian',
    'Malay',
    'Malayalam',
    'Maltese',
    'Maori',
    'Marathi',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Persian',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Quechua',
    'Romanian',
    'Russian',
    'Samoan',
    'Serbian',
    'Slovak',
    'Slovenian',
    'Spanish',
    'Swahili',
    'Swedish ',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Tibetan',
    'Tonga',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Xhosa'
  ];

  public region = [
    'Africa - West',
    'Africa - East',
    'Africa - Other',
    'Asia - China',
    'Asia - India',
    'Asia - Other',
    'Australia / New Zealand',
    'Canada',
    'Central America',
    'US - East Coast',
    'US - West Coast',
    'US - South',
    'US - Midwest',
    'Latin America',
    'Middle East',
    'Europe - Other',
    'Europe - UK/ Ireland ',
  ];

  constructor(
    public fAuth: AngularFireAuth,
    private ngZone: NgZone,
    public fFire: AngularFirestore,
    private fStorage: AngularFireStorage,
    private fAnalytics: AngularFireAnalytics,
    private router: Router) {

    this.model = new Speaker();
    this.userIdToDelete = '';
    // this.errorGDPR = '';

    if (fAuth.auth.currentUser == null) { // there is not user logged in
      // this.router.navigate(['/login']);
      this.ngZone.run(() => this.router.navigateByUrl('/login')).then();
    }

    this.fAuth.auth.onAuthStateChanged(u => {
      /*       this.zone.run();
            ngZone.run(); */
      if (u && u.uid !== this.userIdToDelete) {
        this.user = u;
        this.fFire.collection('speakers').doc<Speaker>(this.user.uid).valueChanges().subscribe(s => {
          if (s) {
            this.model = s;
            if (this.model.picture === '') {
              this.model.picture = '../assets/img/profile.png';
            }
            if (!this.model.sector) {
              this.model.sector = {
                professionalDriver: false,
                professionalRider: false,
                plantOperator: false,
                conductor: false,
                captain: false,
                saccoManager: false,
                stageManager: false,
                clerk: false,
                courierProvider: false,
                driverInstructor: false,
                conductorInstructor: false,
                mechanic: false,
                civilEng: false,
                urban: false,
                trainer: false,
                leadandMentor: false,
                confSpeaker: false,
                policy: false,
                telphoneDev: false,
                autoManufacture: false,
                other: false,
              };
            }
            if (!this.model.signin) {
              this.model.signin = {
                option: '',
                slack: false,
                mailing: false
              };
            }
            if (!this.model.domain) {
              this.model.domain = {
                publicTransport: false,
                onlineTaxi: false,
                courierService: false,
                research: false,
                roads: false,
                safety: false,
                skills: false,
                advocacy: false,
                mentorship: false,
                speaker: false,
                academia: false,
                manufacturer: false,
                software: false,
                innovation: false,
                other: false
              };
            }

            console.log(this.model);
          } else {
            // login for first time
            if (this.user && this.model) {
            this.model.email = this.user.email;
            this.fFire.collection('speakers').doc<Speaker>(this.user.uid).set(Object.assign({}, this.model));
            }
          }
        });
      } else {
        this.ngZone.run(() => this.router.navigateByUrl('/login')).then();
      }
    });
  }

  saveData() {
    this.fAnalytics.logEvent('custom_event', { event: 'saveData', date: new Date().toUTCString() });
    if (this.acceptedGDPR) {
      console.log(this.model);
      this.fFire.collection('speakers').doc<Speaker>(this.user.uid).set(Object.assign({}, this.model));
      this.errorGDPR = '';
      this.savedTxt = 'Your data has been saved!';
      
    } else {
      this.errorGDPR = 'You need to accept our WiT Database statement and Terms and Conditions.';
      this.savedTxt = '';
    }
  }

  removeData() {
    this.fAnalytics.logEvent('custom_event', { event: 'removeData', date: new Date().toUTCString() });
    this.userIdToDelete = this.user.uid;
    this.user = null;
    this.model = null;
    this.fFire.collection('speakers').doc<Speaker>(this.userIdToDelete).delete().catch(error => {
      console.log('Error deleting data: ' + error);
    })
      .then(res => {
        console.log('Result deleting data: ' + res);
        // this.fAuth.auth.signOut();
        this.fAuth.auth.currentUser.delete().catch(error => {
          if (error) {
            // tslint:disable-next-line:max-line-length
            this.errorGDPR = 'This operation is sensitive and requires recent authentication. Log in again before retrying to delete your data.';
          }
        }).then(() => {
          this.fAuth.auth.signOut();
        });
      });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.fAuth.auth.signOut();
  }

  addOtherArea() {
    if (this.otherAreaAdd !== '') {
      if (!this.model.otherAreas) {
        this.model.otherAreas = [];
      }
      this.model.otherAreas.push(this.otherAreaAdd);
      this.otherAreaAdd = '';
    }
  }

  addOtherDomain() {
    if (this.otherDomainAdd !== '') {
      if (!this.model.otherDomains) {
        this.model.otherDomains = [];
      }
      this.model.otherDomains.push(this.otherDomainAdd);
      this.otherDomainAdd = '';
    }
  }

  removeOtherItem(item, model) {
    const indexToRemove = model.indexOf(item);
    if (indexToRemove !== -1) {
      model.splice(indexToRemove, 1);
    }
  }

  handleFileInput(files) {
    console.log(files[0]);
    let filePath = '';
    if (files[0].type === 'image/png') {
      filePath = 'profile' + this.user.uid + '.png';
    } else if (files[0].type === 'image/jpeg') {
      filePath = 'profile' + this.user.uid + '.jpg';
    }
    if (filePath !== '') {
      this.fStorage.upload(filePath, files[0]).then(snap => {
        snap.ref.getDownloadURL().then(url => {
          this.model.picture = url;
        });
      });
    } else {
      this.errorGDPR = 'Upload a valid png or jpg image';
    }
  }

  removeFile() {
    this.model.picture = '../assets/img/profile.png';
  }

}
