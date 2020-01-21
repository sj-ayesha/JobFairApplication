import { Component, OnInit } from '@angular/core';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-jobs-popup',
  templateUrl: './jobs-popup.page.html',
  styleUrls: ['./jobs-popup.page.scss'],
})
export class JobsPopupPage implements OnInit {

  edit: boolean;
  formAddJob: FormGroup;

  constructor(
    private addEditPopupService: AddEditPopupService,
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
