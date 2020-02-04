import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Venue, VenueResponseList } from 'src/app/model/venue';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { VenuePopupPage } from '../../back-office/venue-popup/venue-popup.page';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-venue-bo',
  templateUrl: './venue-bo.page.html',
  styleUrls: ['./venue-bo.page.scss'],
})
export class VenueBoPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  venues: Venue[] = [];
  public columns: any;
  editVenues: any[] = [];
  limit = 20;
  page = 0;
  totalPages = 0;

  constructor(
    private apiService: ApiService,
    public alertCtrl: AlertController,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private addEditPopupService: AddEditPopupService,
  ) { }

  ngOnInit() {
    this.getAllVenue();
  }

  ionViewWillEnter() {
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getAllVenue(event?) {
    this.apiService.getAllVenue(this.page, this.limit).subscribe(
      (data: VenueResponseList) => {

        this.venues = [...this.venues, ...data.venueDtoList];
        this.totalPages = data.totalPages;
      });

    if (event) {
        event.target.complete();
      }
  }

  loadData(event) {
    setTimeout(() => {
      this.page++;
      this.getAllVenue(event);
    }, 500);

    if (this.page === this.totalPages) {
      event.target.disabled = true;
    }

  }

  doRefresh(event) {
    this.venues = [];
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

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
