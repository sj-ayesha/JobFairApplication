import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-skill-popup',
  templateUrl: './skill-popup.page.html',
  styleUrls: ['./skill-popup.page.scss'],
})
export class SkillPopupPage implements OnInit {
  formAddSkill: FormGroup;
  public today = new Date();
  // venueName: string;
  // address: string;
  // startDate: Date;
  // endDate: Date;
  // active: boolean;
  status = false;
  submitted = false;

  error_messages = {
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
  ) {
    this.formAddSkill = this.formBuilder.group({
      skillName: new FormControl('',
        Validators.compose([
          Validators.maxLength(30),
          Validators.required
        ])
      )
    });
   }

  ngOnInit() {
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
        // this.router.navigate(['home']);
      },
      error => {
        // alert("Data not saved!");
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
    if (this.formAddSkill.invalid) {
      this.unsuccessMsg();
    } else {
      this.addSkill();
      this.successMsg();
      this.formAddSkill.reset();
      this.modalController.dismiss();
    }
  }
}
