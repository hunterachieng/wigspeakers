import { Component, OnInit, ViewChild } from '@angular/core';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from '../../speaker';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit {

  public speakersList: Speaker[] = [];
  public displayMap = true;

  /*   @ViewChild(Element) map!: Element;
   */
  constructor(public spService: SpeakerService, private map: MapService) {
    this.speakersList = this.spService.speakersList;
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.map.buildMap();
    }, 2000);

  }

}
