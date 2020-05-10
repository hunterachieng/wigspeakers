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
  public currentPage = 0;

  textSearch = '';
  searchSector = {
    private: false,
    public: false,
    ngo: false,
    self: false,
    university: false,
    international: false,
   // other: false,
  };

  constructor(public spService: SpeakerService) {
  }

  ngOnInit(): void {
  }

  range(size, startAt = 0) {
    size = Math.round(size);
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

  filterByText() {
    this.spService.filterSpeakersByText(this.textSearch);
  }

  filterBySector() {
    this.spService.filterSpeakersBySector(this.searchSector);
  }

  onGeocoderResult(event) {
    console.log(event);
    /*     new Popup()
          .setLngLat(location)
          .setDOMContent(contentContainer)
          .addTo(this.map); */
  }

  @HostListener('window:resize')
  private onWindowResize() {
    if (this.map) {
      this.map.resize();
    }
  }
}

