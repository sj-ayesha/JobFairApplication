import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { SkillPopupPage } from '../skill-popup/skill-popup.page';
import { Skills } from 'src/app/model/skills';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';

@Component({
  selector: 'app-skills-bo',
  templateUrl: './skills-bo.page.html',
  styleUrls: ['./skills-bo.page.scss'],
})
export class SkillsBoPage implements OnInit {

  skills: Skills[];
  public columns: any;
  editSkills: any[] = [];

  constructor(
    private apiService: ApiService,
    public alertCtrl: AlertController,
    private modalController: ModalController,
    private addEditPopupService: AddEditPopupService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllSkills();
    localStorage.removeItem('editSkills');
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

  openAddModal() {
    this.addEditPopupService.showEdit(false);
    this.modalController.create({component: SkillPopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }

  openEditModal() {
    this.addEditPopupService.showEdit(true);
    this.modalController.create({component: SkillPopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }

  edit(Id) {
    this.openEditModal();
    this.editSkills = [];
    for (let i = 0; i < this.skills.length; i++) {
      if ( this.skills[i].skillId === Id) {
          this.editSkills.push(this.skills[i].skillId);
          this.editSkills.push(this.skills[i].skillName);
      }
    }
    const LSeditSkills = JSON.stringify(this.editSkills);
    localStorage.setItem('editSkills', LSeditSkills);
  }
}
