import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddEditPopupService } from 'src/app/services/add-edit-popup.service';
import { DropdownsService } from 'src/app/services/dropdowns.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.page.html',
  styleUrls: ['./user-popup.page.scss'],
})
export class UserPopupPage implements OnInit {
  edit: boolean;
  formAddUser: FormGroup;
  status = true;
  roles: Array<string>;

  users: string;

  errorMessages = {
    visa: [
      { type: 'required', message: '⚠ Visa is required' },
      { type: 'maxLength', message: '⚠ Venue Name must be less than 30 characters' }
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
    private dropdowns: DropdownsService) { }

  ngOnInit() {
    this.roles = this.dropdowns.roles;

    this.addEditPopupService.cast.subscribe(edit => this.edit = edit);
    if (this.edit === true) {
      this.formAddUser = this.formBuilder.group({
        visa: new FormControl('',
          Validators.compose([
            Validators.maxLength(3),
          ])
        ),
        role: new FormControl('',
          Validators.compose([
            Validators.required
          ])
        ),
        active: new FormControl(Validators.required)

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

  closeModal() {
    this.modalController.dismiss();
  }

  radioButtonValue(getValue) {
    this.status = getValue.target.value;
  }


}
