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

  public otherAreaAdd = '';
  public otherAppAdd = '';

  public errorGDPR = '';
  public savedTxt = '';

  public acceptedGDPR = false;

  public areas = [
    { name: 'Please specify ...', group: 'Research / Science', full: 'Research / Science' },
    { name: 'FOSS4G(e.g.QGIS, gdal)', group: 'Geospatial Software', full: 'FOSS4G(e.g.QGIS, gdal) -> Geospatial Software' },
    { name: 'ArcGIS Suite', group: 'Geospatial Software', full: 'ArcGIS Suite -> Geospatial Software' },
    { name: 'Mapinfo Suite', group: 'Geospatial Software', full: 'Mapinfo Suite -> Geospatial Software' },
    { name: 'Cadcorp Suite', group: 'Geospatial Software', full: 'Cadcorp Suite -> Geospatial Software' },
    { name: 'FME', group: 'Geospatial Software', full: 'FME -> Geospatial Software' },
    { name: 'Other(specify)', group: 'Geospatial Software', full: 'Other(specify) -> Geospatial Software' },
    { name: 'Open Layers', group: 'Webmapping', full: 'Open Layers -> Webmapping' },
    { name: 'Leaflet', group: 'Webmapping', full: 'Leaflet -> Webmapping' },
    { name: 'ArcGIS Suite', group: 'Webmapping', full: 'ArcGIS Suite -> Webmapping' },
    { name: 'D3', group: 'Webmapping', full: 'D3 -> Webmapping' },
    { name: 'Mapbox Studio and Mapbox GL', group: 'Webmapping', full: 'Mapbox Studio and Mapbox GL -> Webmapping' },
    { name: 'Other(Specify)', group: 'Webmapping', full: 'Other(Specify) -> Webmapping' },
    { name: 'Geonode / Carto', group: 'Geospatial Open Data platforms', full: 'Geonode / Carto -> Geospatial Open Data platforms' },
    { name: 'ArcGIS Open Data Platform', group: 'Geospatial Open Data platforms', full: 'ArcGIS Open Data Platform -> Geospatial Open Data platforms' },
    { name: 'Copernicus Open Data', group: 'Geospatial Open Data platforms', full: 'Copernicus Open Data -> Geospatial Open Data platforms' },
    { name: 'Earth on AWS', group: 'Geospatial Open Data platforms', full: 'Earth on AWS -> Geospatial Open Data platforms' },
    { name: 'Google Open Data initiative', group: 'Geospatial Open Data platforms', full: 'Google Open Data initiative -> Geospatial Open Data platforms' },
    { name: 'Remote Sensing & Earth Observations', group: 'EO', full: 'Remote Sensing & Earth Observations' },
    { name: 'Geographic Information Systems', group: 'GI', full: 'Geographic Information Systems' },
    { name: 'Ethical Geography', group: '', full: 'Ethical Geography' },
    { name: 'Google Earth Engine', group: 'Geospatial cloud platforms', full: 'Google Earth Engine -> Geospatial cloud platforms' },
    { name: 'Amazon Web Services', group: 'Geospatial cloud platforms', full: 'Amazon Web Services -> Geospatial cloud platforms' },
    { name: 'Other(Specify)', group: 'Geospatial cloud platforms', full: 'Other(Specify) -> Geospatial cloud platforms' },
    { name: 'Python', group: '(Geospatial) programming / Data Science', full: 'Python -> (Geospatial) programming / Data Science' },
    { name: 'R', group: '(Geospatial) programming / Data Science', full: 'R -> (Geospatial) programming / Data Science' },
    { name: 'Jupyter Notebooks', group: '(Geospatial) programming / Data Science', full: 'Jupyter Notebooks -> (Geospatial) programming / Data Science' },
    { name: 'Javascript', group: '(Geospatial) programming / Data Science', full: 'Javascript -> (Geospatial) programming / Data Science' },
    { name: 'Other(Specify)', group: '(Geospatial) programming / Data Science', full: 'Other(Specify) -> (Geospatial) programming / Data Science' },
    { name: 'Cartography', group: 'Data Visualisation', full: 'Cartography -> Data Visualisation' },
    { name: 'Dashboards', group: 'Data Visualisation', full: 'Dashboards -> Data Visualisation' },
    { name: 'Graphic design', group: 'Data Visualisation', full: 'Graphic design -> Data Visualisation' },
    { name: '(Geospatial) Data Journalism', group: '', full: '(Geospatial) Data Journalism' },
    { name: 'Geospatial leadership', group: 'Strategic Skills', full: 'Geospatial leadership -> Strategic Skills' },
    { name: 'Policy', group: 'Strategic Skills', full: 'Policy -> Strategic Skills' },
    { name: 'GI Implementation / Strategy', group: 'Strategic Skills', full: 'GI Implementation / Strategy -> Strategic Skills' },
    { name: 'Growth in the geospatial / space Industry', group: 'Strategic Skills', full: 'Growth in the geospatial / space Industry -> Strategic Skills' },
    { name: 'Spatial Data Analysis & Insight', group: 'Geospatial Data', full: 'Spatial Data Analysis & Insight -> Geospatial Data' },
    { name: 'Location Intelligence', group: 'Geospatial Data', full: 'Location Intelligence -> Geospatial Data' },
    { name: 'Big Data / Geospatial Data', group: 'Geospatial Data', full: 'Big Data / Geospatial Data -> Geospatial Data' },
    { name: 'Open Data', group: 'Geospatial Data', full: 'Open Data -> Geospatial Data' },
    { name: 'Entrepreneurship', group: '', full: 'Entrepreneurship' },
    { name: 'Augmented Reality (AR)', group: 'Innovation / New Uses of GIS data', full: 'Augmented Reality (AR) -> Innovation / New Uses of GIS data' },
    { name: 'Virtual Reality (VR)', group: 'Innovation / New Uses of GIS data', full: 'Virtual Reality (VR) -> Innovation / New Uses of GIS data' },
    { name: 'Machine Learning / Artificial Intelligence', group: 'Innovation / New Uses of GIS data', full: 'Machine Learning / Artificial Intelligence -> Innovation / New Uses of GIS data' },
    { name: 'Blockchain', group: 'Innovation / New Uses of GIS data', full: 'Blockchain -> Innovation / New Uses of GIS data' },
    { name: '5G', group: 'Innovation / New Uses of GIS data', full: '5G -> Innovation / New Uses of GIS data' },
    { name: 'Internet-of-Things (IoT)', group: 'Innovation / New Uses of GIS data', full: 'Internet-of-Things (IoT) -> Innovation / New Uses of GIS data' },
    { name: 'Geospatial and digital transformation', group: 'Innovation / New Uses of GIS data', full: 'Geospatial and digital transformation -> Innovation / New Uses of GIS data' },
    { name: 'Other', group: '', full: 'Other' }
  ];

  public applications = [
    { name: 'Public Health', group: '' },
    { name: 'Defence and Security', group: '' },
    { name: 'Emergency Service / Public Safety', group: '' },
    { name: 'Climate', group: '' },
    { name: 'Smart Cities', group: '' },
    { name: 'Citizen Science', group: '' },
    { name: 'Transportation', group: '' },
    { name: 'Energy', group: '' },
    { name: 'Manufacturing', group: '' },
    { name: 'Environment', group: '' },
    { name: 'Food, Forestry, Agriculture', group: '' },
    { name: 'Sustainable Development', group: '' },
    { name: 'Other(Please specify …)', group: '' }
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
    if (this.acceptedGDPR) {
      console.log(this.model);
      this.fFire.collection('speakers').doc<Speaker>(this.user.uid).set(Object.assign({}, this.model));
      this.errorGDPR = '';
      this.savedTxt = 'Your data has been saved!';
    } else {
      this.errorGDPR = 'Yo need to accept our GDPR statement and Terms and Conditions.';
      this.savedTxt = '';
    }
  }

  ngOnInit(): void {
  }

  logOut() {
    this.fAuth.auth.signOut();
  }

  addOtherApp() {
    if (this.otherAppAdd != '') {
      if (!this.model.otherApplications) {
        this.model.otherApplications = [];
      }
      this.model.otherApplications.push(this.otherAppAdd);
      this.otherAppAdd = '';
    }
  }

  addOtherArea() {
    if (this.otherAreaAdd != '') {
      if (!this.model.otherAreas) {
        this.model.otherAreas = [];
      }
      this.model.otherAreas.push(this.otherAreaAdd);
      this.otherAreaAdd = '';
    }
  }

}
