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
  editSkills: any[] = [];
  reload: boolean;
  public columns: any;

  constructor(
    private apiService: ApiService,
    public alertCtrl: AlertController,
    private modalController: ModalController,
    private addEditPopupService: AddEditPopupService
  ) { }

  ngOnInit() {
    if (this.reload === true) {
      this.getAllSkills();
    }
  }

  ionViewWillEnter() {
    this.getAllSkills();
    localStorage.removeItem('editSkills');
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
      modalElement.onDidDismiss().then((data) => {
        if (data) {
          this.skills = [];
          this.getAllSkills();
        }
      })
      modalElement.present();
    });
  }

  openEditModal() {
    this.addEditPopupService.showEdit(true);
    this.modalController.create({component: SkillPopupPage}).then((modalElement) => {
      modalElement.onDidDismiss().then((data) => {
        if (data) {
          this.skills = [];
          this.getAllSkills();
        }
      })
      modalElement.present();
    });
  }

  edit(Id) {
    this.openEditModal();
    this.editSkills = [];
    this.skills.forEach((element, index) => {
      if ( this.skills[index].skillId === Id) {
        this.editSkills.push(this.skills[index].skillId);
        this.editSkills.push(this.skills[index].skillName);
    }
    });
    // for (let i = 0; i < this.skills.length; i++) {
    //   if ( this.skills[i].skillId === Id) {
    //       this.editSkills.push(this.skills[i].skillId);
    //       this.editSkills.push(this.skills[i].skillName);
    //   }
    // }
    const LSeditSkills = JSON.stringify(this.editSkills);
    localStorage.setItem('editSkills', LSeditSkills);
  }
}
