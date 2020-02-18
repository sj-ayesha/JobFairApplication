import { Component, OnInit } from '@angular/core';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { AlertController, ModalController } from '@ionic/angular';
import { UserPopupPage } from '../user-popup/user-popup.page';
import { ApiService } from 'src/app/services/api.service';
import { UserRoleDtoResponseList } from 'src/app/model/UserRoleDto';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  userRole: any[];
  editUser: any[] = [];

  constructor(
    private addEditPopupService: AddEditPopupService,
    private modalController: ModalController,
    private apiService: ApiService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  openAddModal() {
    this.addEditPopupService.showEdit(false);
    this.modalController.create({component: UserPopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }

  openEditModal() {
    this.addEditPopupService.showEdit(true);
    this.modalController.create({component: UserPopupPage}).then((modalElement) => {
      modalElement.present();
    });
  }

  edit(Id) {
    this.openEditModal();
    this.editUser = [];
    this.userRole.forEach((element, index) => {
      if ( this.userRole[index].userRoleId === Id) {
        this.editUser.push(this.userRole[index].user.userId);
        this.editUser.push(this.userRole[index].user.visa);
        this.editUser.push(this.userRole[index].user.active);
        this.editUser.push(this.userRole[index].role.roleId);
        this.editUser.push(this.userRole[index].role.name);
        this.editUser.push(this.userRole[index].role.description);
    }
    });
    const LSeditUser = JSON.stringify(this.editUser);
    localStorage.setItem('editUser', LSeditUser);
  }

  getAllUsers() {
    this.apiService.getAllUsers().subscribe(data  => {

      this.userRole = data;

      console.log('user', data);
    })
  }
}
