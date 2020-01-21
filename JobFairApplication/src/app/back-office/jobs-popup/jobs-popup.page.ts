import { Component, OnInit } from '@angular/core';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-jobs-popup',
  templateUrl: './jobs-popup.page.html',
  styleUrls: ['./jobs-popup.page.scss'],
})
export class JobsPopupPage implements OnInit {

  edit: boolean;
  formAddJob: FormGroup;
  submitted = false;

  jobId: string;
  title: string;
  level: string;
  category: string;
  description: string;
  minimumExperience: string;
  qualificationNeeded: string;
  apiJobId: number;
  jobs: string;

  error_messages = {
    title: [
      { type: 'required', message: '⚠ Title is required' },
    ],
    level: [
      { type: 'required', message: '⚠ Level is required' },
    ],
    category: [
      { type: 'required', message: '⚠ Job Category is required' },
    ],
    description: [
      { type: 'required', message: '⚠ Job Description is required' },
    ],
    minimumExperience: [
      { type: 'required', message: '⚠ Minimum Experience is required' },
    ],
    qualificationNeeded: [
      { type: 'required', message: '⚠ Qualification is required' },
    ],
  };

  constructor(
    private addEditPopupService: AddEditPopupService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.addEditPopupService.cast.subscribe(edit => this.edit = edit);
    console.log('Ha', this.edit);

    if (this.edit === true) {
      this.formAddJob = this.formBuilder.group({
        skillName: new FormControl('',
          Validators.compose([
            Validators.maxLength(30),
          ])
        )
      });
    } else {
      this.formAddJob = this.formBuilder.group({
        title: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        level: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        category: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        description: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        minimumExperience: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        qualificationNeeded: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
      });
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  addJob() {
    const addJob = {
      jobId: null,
      title: this.formAddJob.get('title').value,
      level: this.formAddJob.get('level').value,
      category: this.formAddJob.get('category').value,
      description: this.formAddJob.get('description').value,
      minimumExperience: this.formAddJob.get('minimumExperience').value,
      qualificationNeeded: this.formAddJob.get('qualificationNeeded').value,
    };
    console.log(addJob);
    this.apiService.saveJob(addJob).subscribe(
      data => {
        // this.router.navigate(['home']);
      },
      error => {
        // alert("Data not saved!");
      }
    );
  }

  ionViewWillEnter() {
    this.jobs = JSON.parse(localStorage.getItem('editJobs'));
    if (this.edit === true) {
      this.jobId = this.jobs[0];
      this.title = this.jobs[1];
      this.level = this.jobs[2];
      this.category = this.jobs[3];
      this.description = this.jobs[4];
      this.minimumExperience = this.jobs[5];
      this.qualificationNeeded = this.jobs[6];
    }
  }

  ionViewWillLeave(){
    localStorage.removeItem('editJobs');
  }

  editJob() {
    const editJob = {
      jobId: null,
      title: this.formAddJob.get('title').value,
      level: this.formAddJob.get('level').value,
      category: this.formAddJob.get('category').value,
      description: this.formAddJob.get('description').value,
      minimumExperience: this.formAddJob.get('minimumExperience').value,
      qualificationNeeded: this.formAddJob.get('qualificationNeeded').value
    };

    console.log(editJob);
    this.apiJobId = JSON.parse(this.jobId);
    console.log(editJob);

    this.apiService.editJob(editJob).subscribe(
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
    if (this.formAddJob.invalid) {
      this.unsuccessMsg();
    } else {
      if (this.edit === true) {
      } else {
        this.addJob();
        this.successMsg();
        this.formAddJob.reset();
        this.modalController.dismiss();
      }
    }
  }

}
