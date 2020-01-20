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
  constructor(private http: HttpClient) {
  }

  showEdit(showEdit){
    this.editAgain.next(showEdit);
  }
}
