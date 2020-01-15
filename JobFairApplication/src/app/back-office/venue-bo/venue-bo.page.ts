import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Venue } from 'src/app/model/venue';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-venue-bo',
  templateUrl: './venue-bo.page.html',
  styleUrls: ['./venue-bo.page.scss'],
})
export class VenueBoPage implements OnInit {
  venues: Venue[];
  public columns: any;

  constructor(
    private apiService: ApiService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getVenueByActive();
  }

  getVenueByActive() {
    this.apiService.getVenueByActive(true).subscribe(data => {
      this.venues = data;
      console.log(this.venues);
    });
  }
}
