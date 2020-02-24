import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';
import { ApiService } from 'src/app/services/api.service';
import { RoleDto } from 'src/app/model/roleDto';
import { SaveUserRole } from 'src/app/model/SaveUserRoleDto';
import { UserDto } from 'src/app/model/UserDto';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.page.html',
  styleUrls: ['./user-popup.page.scss'],
})
export class UserPopupPage implements OnInit {
  edit: boolean;
  formAddUser: FormGroup;
  status = true;
  submitted = false;
  roles: RoleDto;

  user: string
  userId: string;
  visa: string;
  roleId: string;
  role: string;
  roleDescription: string;
  active: string;

  userX: UserDto;
  roleX: RoleDto;
  
  errorMessages = {
    visa: [
      { type: 'required', message: '⚠ Visa is required' },
    ],
    role: [
      { type: 'required', message: '⚠ Role is required' },
    ],
    active: [
      { type: 'required', message: '⚠ Active is required' },
    ]
  };

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private addEditPopupService: AddEditPopupService,
    private toastCtrl: ToastController,
    private dropdowns: DropdownsService,
    private apiService: ApiService) { }

  ngOnInit() {
    // this.roles = this.dropdowns.roles;
    this.getRoles();



    this.addEditPopupService.cast.subscribe(edit => this.edit = edit);
    if (this.edit === true) {
      this.user = JSON.parse(localStorage.getItem('editUser'));
      this.userId = this.user[0];
      this.visa = this.user[1];
      this.active = this.user[2];
      this.roleId = this.user[3];
      this.role = this.user[4];
      this.roleDescription = this.user[5];
      // console.log(this.role);

      this.formAddUser = this.formBuilder.group({
        visa: new FormControl('',
        Validators.compose([
          Validators.required
        ])
        ),
        role: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        active: new FormControl(Validators.required)

      });
      this.formAddUser = this.formBuilder.group({
        visa: new FormControl(this.visa),
        role: new FormControl(this.role),
        active: new FormControl(this.active),
      });
    } else {
      this.formAddUser = this.formBuilder.group({
        visa: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        role: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        active: new FormControl(Validators.required)
      });
    }
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('editUser'));
    if (this.edit === true) {
      this.userId = this.user[0];
      this.visa = this.user[1];
      this.active = this.user[2];
      this.roleId = this.user[3];
      this.role = this.user[4];
      this.roleDescription = this.user[5];
    }
  }
  ionViewWillLeave() {
    localStorage.removeItem('editUser');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  radioButtonValue(getValue) {
    this.status = getValue.target.value;
  }

  getRoles() {
    this.apiService.getAllRoles().subscribe(data => {
      this.roles = data;
    });
  }


  addUser() {
    this.userX = {
      visa: this.formAddUser.get('visa').value,
      password: this.formAddUser.get('visa').value + '1234',
      active: this.status
    };

    this.roleX = {
      roleId: this.formAddUser.get('role').value,
      name: null,
      description: null,
      candidateAdd: null,
      candidateDetail: null,
      candidateList: null,
      home: null,
      jobList: null,
      venuePage: null,
      dashboard: null,
      jobBo: null,
      skillBo: null,
      venueBo: null,
      venueJobBo: null
    };

    const userRole = {
      user: this.userX,
      role: this.roleX
    };
    console.log(userRole);
    this.apiService.saveUser(userRole).subscribe(
      data => {
      },
      error => {
      }
    );
  }

  editUser() {

  }

  async successMsg() {
    const toast = await this.toastCtrl.create({
      message: 'New venue has been succesfully saved',
      position: 'top',
      color: 'success',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  async successEditMsg() {
    const toast = await this.toastCtrl.create({
      message: 'has been succesfully saved',
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
    if (this.formAddUser.invalid) {
      this.unsuccessMsg();
    } else {
      if (this.edit === true) {
        this.editUser();
        this.successEditMsg();
        this.formAddUser.reset();
        this.modalController.dismiss();
      } else {
        this.addUser();
        this.successMsg();
        this.formAddUser.reset();
        this.modalController.dismiss();
      }
    }
  }

}
