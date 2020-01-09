import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Venue } from '../model/venue';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangeVenueService {
  public venueName: string = '';
  private venue = new BehaviorSubject<string>(this.venueName);
  cast = this.venue.asObservable();

  constructor(private http: HttpClient) { }

  editVenue(newVenue){
    this.venue.next(newVenue);
  }
}
