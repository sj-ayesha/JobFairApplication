import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  public candidates: any = [];

  public getcandidateDetail() {
    return this.candidates;
  }
}
