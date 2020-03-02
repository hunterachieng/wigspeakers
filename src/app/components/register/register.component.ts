import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { Speaker } from '../../speaker';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = null;
  public model: Speaker;

  public otherArea = '';

  public areas = [
    'Research / Science',
    // 'Please specify ...',
    'Geospatial Software',
    'FOSS4G(e.g.QGIS, gdal)',
    'ArcGIS Suite',
    'Mapinfo Suite',
    'Cadcorp Suite',
    'FME',
    'Other(specify)',
    'Webmapping',
    'Open Layers',
    'Leaflet',
    'ArcGIS Suite',
    'D3',
    'Mapbox Studio and Mapbox GL',
    'Other(Specify)',
    'Geospatial Open Data platforms',
    'Geonode / Carto',
    'ArcGIS Suite',
    'Remote Sensing & Earth Observations',
    'Geographic Information Systems',
    'Ethical Geography',
    'Geospatial cloud platforms',
    'Google Earth Engine',
    'Amazon Web Services',
    'Other(Specify)',
    ' (Geospatial) programming / Data Science',
    'Python',
    'R',
    'Jupyter Notebooks',
    'Other(Specify)',
    'Domain - specific geospatial applications',
    'Public Health',
    'Defence and Security',
    'Emergency Service / Public Safety',
    'Climate',
    'Defence and Security',
    'Smart Cities',
    'Citizen Science',
    'Transportation',
    'Energy',
    'Manufacturing',
    'Environment',
    'Food, Forestry, Agriculture',
    'Sustainable Development',
    'Other(Please specify …)',
    'Data Visualisation',
    'Cartography',
    'Dashboards',
    'Graphic design',
    ' (Geospatial) Data Journalism',
    'Strategic Skills',
    'Geospatial leadership',
    'Policy',
    'GI Implementation / Strategy',
    'Growth in the geospatial / space Industry',
    'Geospatial Data',
    'Spatial Data Analysis & Insight',
    'Location Intelligence',
    'Big Data / Geospatial Data',
    'Open Data',
    'Entrepreneurship',
    'Innovation / New Uses of GIS data',
    'Augmented Reality(AR)',
    'Virtual Reality(VR)',
    'Machine Learning / Artificial Intelligence',
    'Blockchain',
    '5G',
    'Internet - of - Things(IoT)',
    'Geospatial and digital transformation',
    'Other '
  ];


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

  constructor(public fAuth: AngularFireAuth, public fFire: AngularFirestore) {
    this.model = new Speaker();
    this.fAuth.auth.onAuthStateChanged(u => {
      if (u) {
        this.user = u;
        this.fFire.collection('speakers').doc<Speaker>(this.user.uid).valueChanges().subscribe(s => {
          if (s) {
            this.model = s;
          } else {
            this.model.email = this.user.email;
            this.fFire.collection('speakers').doc<Speaker>(this.user.uid).set(Object.assign({}, this.model));
          }
        });
      }
    });
  }

  saveData() {
    console.log(this.model);
    this.fFire.collection('speakers').doc<Speaker>(this.user.uid).set(Object.assign({}, this.model));
  }

  ngOnInit(): void {
  }

  clickButton() {
    console.log("BUTTON PRESSED");
  }

  logOut() {
    this.fAuth.auth.signOut();
  }

}
