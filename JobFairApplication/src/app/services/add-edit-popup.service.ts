import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddEditPopupService {

  editValue = false;
  private editAgain = new BehaviorSubject<boolean>(this.editValue);
  cast = this.editAgain.asObservable();

  reload = false
  private doReload = new BehaviorSubject<boolean>(this.reload);
  castReload = this.doReload.asObservable();

  constructor() {
  }

  showEdit(showEdit){
    this.editAgain.next(showEdit);
  }

  reloadComponent(isReload){
    this.doReload.next(isReload);
  }
}
