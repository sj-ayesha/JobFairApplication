import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-venue-popup',
  templateUrl: './venue-popup.page.html',
  styleUrls: ['./venue-popup.page.scss'],
})
export class VenuePopupPage implements OnInit {
  formAddVenue: FormGroup;
  public today = new Date();
  // venueName: string;
  // address: string;
  // startDate: Date;
  // endDate: Date;
  // active: boolean;
  status = false;
  submitted = false;

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
  ) {
    this.formAddVenue = this.formBuilder.group({
      venueName: new FormControl('',
        Validators.compose([
          Validators.maxLength(30),
          Validators.required
        ])
      ),
      address: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate : new FormControl('', Validators.required),
      active: new FormControl('', Validators.required)
    })
   }

  ngOnInit() {
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
      this.addVenue();
      this.successMsg();
      this.formAddVenue.reset();
      this.modalController.dismiss();
    }
  }
}
