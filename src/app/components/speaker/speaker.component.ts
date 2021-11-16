import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from 'src/app/speaker';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {

  sp: Speaker;

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
    other: 'Other (please specify)'
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

  constructor(private route: ActivatedRoute, private speakerService: SpeakerService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const spSub = this.speakerService
      .getSpeakerById(id)
      .subscribe(speaker => {
        if (speaker) {
          this.sp = speaker;
          spSub.unsubscribe();
        }
      });
  }

  typeOf(value) {
    return typeof value;
  }

  sendEmail(e) {
    location.href = 'mailto:' + e + '?subject=WiT Professional';
  }

}
