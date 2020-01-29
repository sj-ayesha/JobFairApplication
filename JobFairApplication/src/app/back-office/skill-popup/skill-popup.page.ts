import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';

@Component({
  selector: 'app-skill-popup',
  templateUrl: './skill-popup.page.html',
  styleUrls: ['./skill-popup.page.scss'],
})
export class SkillPopupPage implements OnInit {
  formAddSkill: FormGroup;
  public today = new Date();
  status = false;
  submitted = false;
  edit: boolean;
  apiSkillId: number;
  skills: string;
  skillId: string;
  skillName: string;

  errorMessages = {
    skillName: [
      { type: 'required', message: '⚠ Skill is required' },
      { type: 'maxLength', message: '⚠ Skill must be less than 30 characters' }
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
    console.log('Ha', this.edit);
    if (this.edit === true) {
      this.formAddSkill = this.formBuilder.group({
        skillName: new FormControl('',
          Validators.compose([
            Validators.maxLength(30),
          ])
        )
      });
    } else {
      this.formAddSkill = this.formBuilder.group({
        skillName: new FormControl('',
          Validators.compose([
            Validators.maxLength(30),
            Validators.required
          ])
        )
      });
    }
  }

  ionViewWillEnter() {
    this.skills = JSON.parse(localStorage.getItem('editSkills'));
    if (this.edit === true) {
      this.skillId = this.skills[0];
      this.skillName = this.skills[1];
    }
  }

  ionViewWillLeave() {
    localStorage.removeItem('editSkills');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  radioButtonValue(getValue) {
    this.status = getValue.target.value;
  }



  addSkill() {
    const addSkill = {
      skillId: null,
      skillName: this.formAddSkill.get('skillName').value,
    };
    console.log(addSkill);
    this.apiService.saveSkill(addSkill).subscribe(
      data => {
      },
      error => {
      }
    );
  }

  editSkill() {
    const editSkill = {
      skillId: JSON.parse(this.skillId),
      skillName: this.formAddSkill.get('skillName').value
    };

    console.log(editSkill);
    this.apiSkillId = JSON.parse(this.skillId);
    console.log(editSkill);

    this.apiService.editSkill(editSkill).subscribe(
      data => {
      },
      error => {
      }
    );
  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'New skill has been succesfully saved',
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async successEditMsg() {
    const toast = await this.toastCtrl.create({
      message: this.skillName + ' has been succesfully saved',
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
    if (this.formAddSkill.invalid) {
      this.unsuccessMsg();
    } else {
      if (this.edit === true) {
        this.editSkill();
        this.successEditMsg();
        this.formAddSkill.reset();
        this.modalController.dismiss();
      } else {
        this.addSkill();
        this.successMsg();
        this.formAddSkill.reset();
        this.modalController.dismiss();
      }
    }
  }
}
