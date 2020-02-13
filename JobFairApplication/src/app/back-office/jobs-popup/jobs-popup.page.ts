import { Component, OnInit } from '@angular/core';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-jobs-popup',
  templateUrl: './jobs-popup.page.html',
  styleUrls: ['./jobs-popup.page.scss'],
})
export class JobsPopupPage implements OnInit {

  edit: boolean;
  formAddJob: FormGroup;
  submitted = false;
  categories: Array<string>;

  jobId: string;
  title: string;
  level: string;
  category: string;
  description: string;
  minimumExperience: string;
  qualificationNeeded: string;
  jobs: string;
  apiJobId: number;

  errorMessages = {
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
    private apiService: ApiService,
    private dropdowns: DropdownsService,
  ) { }

  ngOnInit() {
    this.categories = this.dropdowns.categories;

    this.addEditPopupService.cast.subscribe(edit => this.edit = edit);

    // if user clicks on edit icon ELSE if user clicks on the add button
    if (this.edit === true) {
      this.jobs = JSON.parse(localStorage.getItem('editJobs'));
      if (this.edit === true) {
        this.jobId = this.jobs[0];
        this.title = this.jobs[1];
        this.level = this.jobs[2];
        this.category = this.jobs[3];
        this.description = this.jobs[4].replace(/;/g, '\n');
        this.minimumExperience = this.jobs[5];
        this.qualificationNeeded = this.jobs[6];
      }

      // change value format of modal to value format by what is required in back-end
      if (this.jobs[3] === 'software-engineer') {
        this.category = 'Software Engineer';
      } else
      if (this.jobs[3] === 'architect') {
        this.category = 'Architect';
      } else
      if (this.jobs[3] === 'manager') {
        this.category = 'Manager';
      } else
      if (this.jobs[3] === 'business-analyst') {
        this.category = 'Business Analyst';
      } else
      if (this.jobs[3] === 'quality-assurance') {
        this.category = 'Quality Assurance';
      } else
      if (this.jobs[3] === 'human-resource') {
        this.category = 'Human Resource';
      }

      this.formAddJob = this.formBuilder.group({
        title: new FormControl(this.title),
        level: new FormControl(this.level),
        category: new FormControl(this.category),
        description: new FormControl(this.description),
        minimumExperience: new FormControl(this.minimumExperience),
        qualificationNeeded: new FormControl(this.qualificationNeeded),
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

  // close modal
  closeModal() {
    this.modalController.dismiss();
  }

  // save a new job
  addJob() {
    const addJob = {
      jobId: null,
      title: this.formAddJob.get('title').value,
      level: this.formAddJob.get('level').value,
      category: this.formAddJob.get('category').value,
      description: this.formAddJob.get('description').value.replace(/[\r\n]+/g, ';'),
      minimumExperience: this.formAddJob.get('minimumExperience').value,
      qualificationNeeded: this.formAddJob.get('qualificationNeeded').value,
      checked: null
    };

    this.apiService.saveJob(addJob).subscribe(
      data => {
      },
      error => {
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
      this.description = this.jobs[4].replace(/;/g, '\n');
      this.minimumExperience = this.jobs[5];
      this.qualificationNeeded = this.jobs[6];
    }
  }

  ionViewWillLeave() {
    localStorage.removeItem('editJobs');
  }

  // save an edited job
  editJob() {
    if (this.formAddJob.get('category').value === 'Software Engineer') {
      this.category = 'software-engineer';
    } else
    if (this.formAddJob.get('category').value === 'Architect') {
      this.category = 'architect';
    } else
    if (this.formAddJob.get('category').value === 'Manager') {
      this.category = 'manager';
    } else
    if (this.formAddJob.get('category').value === 'Business Analyst') {
      this.category = 'business-analyst';
    } else
    if (this.formAddJob.get('category').value === 'Quality Assurance') {
      this.category = 'quality-assurance';
    } else
    if (this.formAddJob.get('category').value === 'Human Resource') {
      this.category = 'human-resource';
    }
    const editJob = {
      jobId: JSON.parse(this.jobId),
      title: this.formAddJob.get('title').value,
      level: this.formAddJob.get('level').value,
      category: this.category,
      description: this.formAddJob.get('description').value.replace(/[\r\n]+/g, ';'),
      minimumExperience: this.formAddJob.get('minimumExperience').value,
      qualificationNeeded: this.formAddJob.get('qualificationNeeded').value,
      checked: null
    };
    this.apiJobId = JSON.parse(this.jobId);
    console.log('category', this.category);
    this.apiService.editJob(editJob).subscribe(
      data => {
      },
      error => {
      }
    );
  }

  // successful add message
  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'New job has been succesfully saved',
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  // successfull edit message
  async successEditMsg() {
    const toast = await this.toastCtrl.create({
      message: this.title + ' has been succesfully edited',
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  // unsuccessful message
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

  // when clicking on 'save' or 'submit'
  onSubmit() {
    this.submitted = true;
    if (this.formAddJob.invalid) {
      this.unsuccessMsg();
    } else {
      if (this.edit === true) {
        this.editJob();
        this.successEditMsg();
        this.formAddJob.reset();
        this.modalController.dismiss();
        this.addEditPopupService.reloadComponent(true);
      } else {
        this.addJob();
        this.successMsg();
        this.formAddJob.reset();
        this.modalController.dismiss();
      }
    }
  }
}
