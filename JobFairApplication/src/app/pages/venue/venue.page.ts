import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/model/venue';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {
  formVenue: FormGroup;
  venues: Venue[];
  public select ="";

  error_messages = {
    venues: [
      { type: 'required', message: '⚠ Venue is required.' },
    ],
  }
  
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.formVenue = this.formBuilder.group({
      venues: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.getVenueByActive();
  }

  selected(id){
    localStorage.setItem('venue_id', id.target.value);
    const count = JSON.parse(localStorage.venue_id).length;
    console.log(count);
  }

  getVenueByActive(){
    this.apiService.getVenueByActive(true).subscribe(data=>{
      this.venues = data;
      // console.log(this.venues);
    });
  }
}
