import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from 'src/app/speaker';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {

  sp: Speaker;

  public sectorsText: {
    private: 'Private Company',
    public: 'Public sector / Government',
    ngo: 'Non-governmental organisation (NGO) / Not-For-Profit organisation',
    self: 'Self-employed / Consulting',
    university: 'University / Academia',
    international: 'International organisation',
    other: 'Other (please specify)'
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

}
