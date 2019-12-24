import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/model/venue';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  error_messages = {
    venues: [
      { type: 'required', message: '⚠ Venue is required.' },
    ],
  };

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController) {
    this.formVenue = this.formBuilder.group({
      venues: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.getVenueByActive();
  }

  selected(id) {
    localStorage.setItem('venue_id', id.target.value);
    const LSid = JSON.parse(localStorage.getItem('venue_id'));

    for (let i = 0; i <= this.venues.length; i++) {
      if (LSid === this.venues[i].venueId){
        console.log(this.venues[i].venueName);
      }
      else {
        console.log("not found");
      }
    }

    console.log(this.venues[0].venueId);
    // console.log(LSid);
  }

  getVenueByActive() {
    this.apiService.getVenueByActive(true).subscribe(data => {
      this.venues = data;
      // console.log(this.venues);
    });
  }

  onSubmit() {
    if (this.formVenue.invalid) {
      this.submitted = false;
      this.UnsuccessMsg();
    } else {
      // this.submitCandidate();
      this.submitted = true;
      this.router.navigate(['home']);
    }
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
