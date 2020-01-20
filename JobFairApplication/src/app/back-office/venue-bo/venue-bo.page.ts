import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Venue } from 'src/app/model/venue';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { VenuePopupPage } from '../../back-office/venue-popup/venue-popup.page';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';

@Component({
  selector: 'app-venue-bo',
  templateUrl: './venue-bo.page.html',
  styleUrls: ['./venue-bo.page.scss'],
})
export class VenueBoPage implements OnInit {

  venues: Venue[];
  public columns: any;
  editVenues: any[] = [];

  constructor(
    private apiService: ApiService,
    public alertCtrl: AlertController,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private addEditPopupService: AddEditPopupService
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

  openAddModal() {
    this.addEditPopupService.showEdit(false);
    this.modalController.create({component: VenuePopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }

  openEditModal() {
    this.addEditPopupService.showEdit(true);
    this.modalController.create({component: VenuePopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }

  edit(Id) { 
    this.openEditModal();
    this.editVenues = [];
    for (let i = 0; i < this.venues.length; i++) {
      if ( this.venues[i].venueId === Id) {
          this.editVenues.push(this.venues[i].venueId);
          this.editVenues.push(this.venues[i].venueName);
          this.editVenues.push(this.venues[i].address);
          this.editVenues.push(this.venues[i].startDate);
          this.editVenues.push(this.venues[i].endDate);
          this.editVenues.push(this.venues[i].active);
      }
    }
    const LSeditVenues = JSON.stringify(this.editVenues);
    localStorage.setItem('editVenues', LSeditVenues);
  }
}
