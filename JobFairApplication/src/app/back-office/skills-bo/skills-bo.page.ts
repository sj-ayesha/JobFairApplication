import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { SkillPopupPage } from '../skill-popup/skill-popup.page';
import { Skills } from 'src/app/model/skills';

@Component({
  selector: 'app-skills-bo',
  templateUrl: './skills-bo.page.html',
  styleUrls: ['./skills-bo.page.scss'],
})
export class SkillsBoPage implements OnInit {

  skills: Skills[];
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
    this.getAllSkills();
  }
  ionViewWillLeave() {
  }

  getAllSkills() {
    this.apiService.getAllSkills().subscribe(data => {
      this.skills = data;
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
    this.modalController.create({component: SkillPopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }
}
