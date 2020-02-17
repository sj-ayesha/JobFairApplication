import { Component, OnInit } from '@angular/core';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private addEditPopupService: AddEditPopupService, private modalController: ModalController,) { }

  ngOnInit() {
  }

  openAddModal() {
    this.addEditPopupService.showEdit(false);
    // this.modalController.create({component: SkillPopupPage}).then((modalElement) => {
    //   modalElement.present();
    // });
  }
}
