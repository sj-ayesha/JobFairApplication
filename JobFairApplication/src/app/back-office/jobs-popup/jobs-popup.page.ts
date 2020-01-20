import { Component, OnInit } from '@angular/core';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-jobs-popup',
  templateUrl: './jobs-popup.page.html',
  styleUrls: ['./jobs-popup.page.scss'],
})
export class JobsPopupPage implements OnInit {

  constructor(private addEditPopupService: AddEditPopupService, private modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
