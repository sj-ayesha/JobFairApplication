import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';

@Component({
  selector: 'app-venue-popup',
  templateUrl: './venue-popup.page.html',
  styleUrls: ['./venue-popup.page.scss'],
})
export class VenuePopupPage implements OnInit {
  formAddVenue: FormGroup;
  public today = new Date();

  venueId: string;
  venueName: string;
  address: string;
  startDate: string;
  endDate: string;
  active: string;

  status = true;
  submitted = false;
  edit: boolean;
  venues: string;

  error_messages = {
    venueName: [
      { type: 'required', message: '⚠ Venue Name is required' },
      { type: 'maxLength', message: '⚠ Venue Name must be less than 30 characters' }
    ],
    address: [
      { type: 'required', message: '⚠ Address is required' },
    ],
    startDate: [
      { type: 'required', message: '⚠ Start Date is required' },
    ],
    endDate: [
      { type: 'required', message: '⚠ End Date is required' },
    ],
    active: [
      { type: 'required', message: '⚠ Active is required' },
    ]
  };

  constructor(
    private apiService: ApiService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private addEditPopupService: AddEditPopupService
  ) {
  }

  ngOnInit() {
    this.addEditPopupService.cast.subscribe(edit => this.edit = edit);
    if (this.edit === true) {
      this.formAddVenue = this.formBuilder.group({
        venueName: new FormControl('',
          Validators.compose([
            Validators.maxLength(30)
          ])
        ),
        address: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        active: new FormControl('')
      });
    } else {
      this.formAddVenue = this.formBuilder.group({
        venueName: new FormControl('',
          Validators.compose([
            Validators.maxLength(30),
            Validators.required
          ])
        ),
        address: new FormControl('', Validators.required),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        active: new FormControl(Validators.required)
      });
    }
  }

  ionViewWillEnter() {
    this.venues = JSON.parse(localStorage.getItem('editVenues'));
    if (this.edit === true) {
      this.venueId = this.venues[0];
      this.venueName = this.venues[1];
      this.address = this.venues[2];
      this.startDate = this.venues[3];
      this.endDate = this.venues[4];
      this.active = this.venues[5];
    }
  }
  ionViewWillLeave(){
    localStorage.removeItem('editVenues');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  radioButtonValue(getValue) {
    this.status = getValue.target.value;
  }

  addVenue() {
    const addVenue = {
      venueId: null,
      venueName: this.formAddVenue.get('venueName').value,
      startDate: this.formAddVenue.get('startDate').value,
      endDate: this.formAddVenue.get('endDate').value,
      address: this.formAddVenue.get('address').value,
      active: this.status
    };
    console.log(addVenue);
    this.apiService.saveVenue(addVenue).subscribe(
      data => {
        // this.router.navigate(['home']);
      },
      error => {
        // alert("Data not saved!");
      }
    );
  }

  editVenue() {
    const editVenue = {
      venueId: JSON.parse(this.venueId),
      venueName: this.formAddVenue.get('venueName').value,
      startDate: this.formAddVenue.get('startDate').value,
      endDate: this.formAddVenue.get('endDate').value,
      address: this.formAddVenue.get('address').value,
      active: this.status
    };
    console.log(editVenue);
    this.apiService.saveVenue(editVenue).subscribe(
      data => {
        // this.router.navigate(['home']);
      },
      error => {
        // alert("Data not saved!");
      }
    );
  }
  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'New venue has been succesfully saved',
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async unsuccessMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Please fill in all the required fields',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  onSubmit() {
    this.submitted = true;
    // tslint:disable-next-line: max-line-length
    if (this.formAddVenue.invalid) {
      this.unsuccessMsg();
    } else {
      if (this.edit === true) {
        this.editVenue();
        this.successMsg();
        this.formAddVenue.reset();
        this.modalController.dismiss();
      } else {
        this.addVenue();
        this.successMsg();
        this.formAddVenue.reset();
        this.modalController.dismiss();
      }
    }
  }
}
