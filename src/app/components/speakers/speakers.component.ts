import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from '../../speaker';
import { ActivatedRoute } from '@angular/router';

/* import { MapService } from 'src/app/services/map.service';
 */
@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit {

  private map: mapboxgl.Map;
  public paginationLimitFrom = 0;
  public paginationLimitTo = 8;
  public LIMIT_PER_PAGE = 8;
  public currentPage = 0;

  textSearch = '';
  searchSector = {
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
    // other: false,
  };
  textYears = '';
  textLevel = '';

  searchDomain = {
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
    // other: false,
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
  public sectorsText: {
    professionalDriver: 'Professional Driver specify(Truck, Matatus, Bus, BRT , Ambulance)',
    professionalRider: 'Professional Riders Specify(Bicycle, Motorcycle, TukTuk/Rickshaws)',
    plantOperator: 'Plant operator(excavator, harvester)',
    conductor: 'Professional conductor',
    captain: 'Captain Specify(Ship,Plane,train)',
    saccoManager: 'Fleet/Sacco Manager',
    stageManager: 'Stage Manager',
    clerk: 'Stage Clerk',
    courierProvider: 'Courier Service Provider',
    driverInstructor: 'Drivers Instructor',
    conductorInstructor: 'Conductors Instructor',
    mechanic: 'Mechanic',
    civilEng: 'Civil Engineer',
    urban: 'Urban Planner',
    trainer: 'Trainer(First Aid, Road Safety, Customer Service, Gender Mainstreaming, CV writing, Disability sensitization, Mental Health, SRHR, Women rights, Financial Literacy….)',
    leadandMentor: 'Women In Transport Leadership & Mentorship',
    confSpeaker: 'Women In Transport Africa Conference Speaker',
    policy: 'Researcher and Policy practitioner',
    telphoneDev: 'Software Telephone Developer',
    autoManufacture: 'Automotive manufacturer',
    // other: 'Other (please specify)'
  };


  

  domainText = {
    publicTransport: ' Public Transport Operator',
    onlineTaxi: 'Online Taxis',
    courierService: 'Courier services',
    research: 'Policy & Research',
    roads: 'Roads Construction',
    safety: 'Public Safety & Security',
    skills: 'Capacity/Skills Building',
    advocacy: 'Advocacy',
    mentorship: 'Leadership mentorship',
    speaker: 'Conference Speaker',
    academia: 'Academia',
    manufacturer: 'Manufacturer',
    software: 'IT & Software',
    innovation: 'Innovation'
  };

  searchLanguages = '';

  contactEmail = {
    name: '',
    email: '',
    message: ''
  };

  selectedSpeaker: Speaker;

  constructor(private route: ActivatedRoute, public spService: SpeakerService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.seeProfile(id);
    }
  }

  seeProfile(id) {
    const spSub = this.spService
      .getSpeakerById(id)
      .subscribe(speaker => {
        if (speaker) {
          this.selectedSpeaker = speaker;
          spSub.unsubscribe();
        }
      });
  }

  range(size, startAt = 0) {
    size = Math.ceil(size);
    return [...Array(size).keys()].map(i => i + startAt);
  }

  nextPage() {
    if (this.currentPage + 1 < Math.ceil(this.spService.speakersList.length / this.LIMIT_PER_PAGE)) {
      this.paginationLimitFrom = this.paginationLimitFrom + this.LIMIT_PER_PAGE;
      this.paginationLimitTo = this.paginationLimitTo + this.LIMIT_PER_PAGE;
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.paginationLimitFrom = this.paginationLimitFrom - this.LIMIT_PER_PAGE;
      this.paginationLimitTo = this.paginationLimitTo - this.LIMIT_PER_PAGE;
      this.currentPage--;
    }
  }

  filterAll() {
    this.spService.filteredSpeakersList = this.spService.speakersList;
    this.filterByText();
    this.filterBySector();
    this.filterByYears();
    this.filterByLevel();
    this.filterByLanguages();
    this.filterByDomain();
    
  }

  filterByText() {
    this.spService.filterSpeakersByText(this.textSearch);
  }

  filterBySector() {
    this.spService.filterSpeakersBySector(this.searchSector);
  }

  filterByDomain() {
    this.spService.filterSpeakersByDomain(this.searchDomain);
  }

 

  filterByYears() {
    this.spService.filterSpeakersByYears(this.textYears);
  }

  filterByLevel() {
    this.spService.filterSpeakersByLevel(this.textLevel);
  }

  filterByLanguages() {
    this.spService.filterSpeakersByLanguages(this.searchLanguages);
  }

  onGeocoderResult(event) {
    console.log(event);
    /*     new Popup()
          .setLngLat(location)
          .setDOMContent(contentContainer)
          .addTo(this.map); */
  }

  typeOf(value) {
    return typeof value;
  }


  sendEmail(e) {
    location.href = 'mailto:' + e + '?subject=WiT Professional';
  }


  @HostListener('window:resize')
  private onWindowResize() {
    if (this.map) {
      this.map.resize();
    }
  }
}

