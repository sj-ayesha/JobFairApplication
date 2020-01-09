import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/model/venue';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ChangeVenueService } from 'src/app/services/change-venue.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {
  formVenue: FormGroup;
  venues: Venue[];
  public select = '';
  submitted = false;
  venue: Array<string>;

  oldVenue: string;
  changeVenue: string;

  error_messages = {
    venues: [
      { type: 'required', message: '⚠ Venue is required.' },
    ],
  };

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private changeVenueService: ChangeVenueService) {
    this.formVenue = this.formBuilder.group({
      venues: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.formVenue.reset();
    this.getVenueByActive();
    this.changeVenueService.cast.subscribe(data => this.oldVenue = data);
  }

  selected(id) {
    localStorage.setItem('venue_id', id.target.value);
    const LSid = JSON.parse(localStorage.getItem('venue_id'));

    for (let i = 0; i < this.venues.length; i++) {
      if (LSid === this.venues[i].venueId){
        window.localStorage.setItem('venueName', this.venues[i].venueName);
      }
    }
  }

  getVenueByActive() {
    this.apiService.getVenueByActive(true).subscribe(data => {
      this.venues = data;
    });
  }

  onSubmit() {
    if (this.formVenue.invalid) {
      this.submitted = false;
      this.UnsuccessMsg();
    } else {
      window.localStorage.setItem('venue_id', this.formVenue.get('venues').value);
      const LSid = JSON.parse(localStorage.getItem('venue_id'));

      for (let i = 0; i < this.venues.length; i++) {
      if (LSid === this.venues[i].venueId) {
        window.localStorage.setItem('venueName', this.venues[i].venueName);
      }
    }
      this.router.navigateByUrl('/home');
    }
  }

  editTheVenue(){
    const LSid = JSON.parse(localStorage.getItem('venue_id'));
    for (let i = 0; i < this.venues.length; i++) {
      if (LSid === this.venues[i].venueId){
        window.localStorage.setItem('venueName', this.venues[i].venueName);
      }
    }
    this.changeVenueService.editVenue(window.localStorage.getItem('venueName'));
  }

  async UnsuccessMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Please select a venue to proceed',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }
}
