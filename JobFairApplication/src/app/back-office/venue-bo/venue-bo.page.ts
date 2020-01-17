import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Venue } from 'src/app/model/venue';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { VenuePopupPage } from '../../back-office/venue-popup/venue-popup.page';

@Component({
  selector: 'app-venue-bo',
  templateUrl: './venue-bo.page.html',
  styleUrls: ['./venue-bo.page.scss'],
})
export class VenueBoPage implements OnInit {

  venues: Venue[];
  public columns: any;

  constructor(
    private apiService: ApiService,
    public alertCtrl: AlertController,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllVenue();
  }
  ionViewWillLeave(){
  }

  getAllVenue() {
    this.apiService.getAllVenue().subscribe(data => {
      this.venues = data;
    });
  }

  doRefresh(event) {
    this.ionViewWillEnter();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // async presentPopover(event) {
  //   const popover = await this.popoverController.create({
  //     component: AddVenuePopupComponent,
  //     event
  //   });
  //   return await popover.present();
  // }
  // closePopover(){
  //   this.popoverController.dismiss();
  // }

  openModal() {
    this.modalController.create({component: VenuePopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }
}
