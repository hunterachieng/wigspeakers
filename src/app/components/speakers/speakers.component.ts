import { Component, OnInit, HostListener } from '@angular/core';
import { SpeakerService } from '../../services/speaker.service';
import { Speaker } from '../../speaker';

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
  public paginationLimitTo = 4;
  public LIMIT_PER_PAGE = 4;
  public limitPagination = [];
  public currentPage = 0;

  constructor(public spService: SpeakerService) {
  }

  ngOnInit(): void {
    this.limitPagination = this.range(20, 0);
  }

  range(size, startAt = 0) {
    size = Math.round(size);
    console.log('Array de ' + size);
    return [...Array(size).keys()].map(i => i + startAt);
  }

  nextPage() {
    if (this.currentPage < Math.floor(this.spService.speakersList.length / this.LIMIT_PER_PAGE)) {
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

  @HostListener('window:resize')
  private onWindowResize() {
    if (this.map) {
      this.map.resize();
    }
  }
}

