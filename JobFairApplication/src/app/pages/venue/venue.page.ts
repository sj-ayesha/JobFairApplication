import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/model/venue';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {

  venues: Venue[];
  public select ="";
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getVenueByActive();
  }

  selected(id){
    localStorage.setItem('venue_id', id.target.value);
  }

  getVenueByActive(){
    this.apiService.getVenueByActive(true).subscribe(data=>{
      this.venues = data;
      // console.log(this.venues);
    });
  }
}
