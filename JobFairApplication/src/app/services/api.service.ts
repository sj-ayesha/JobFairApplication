import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../model/candidate';
import { Job } from '../model/job';
import { Venue } from '../model/venue';
import { Qualification } from '../model/qualification';
import { Experience } from '../model/experience';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8081/'; // url to access backend

  getAllCandidates(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/all');
  }

  getJobsByCategory(category: String): Observable<Job[]>{
    return this.http.get<Job[]>(this.baseUrl + 'job/category/' + category);
  }

  saveCandidate(candidate: Candidate): Observable<Candidate[]> {
    return this.http.post<Candidate[]>(this.baseUrl, Candidate);
  }

  getCandidateById(candidateId : Number): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/' + candidateId );
  }

  getVenueByActive(active:boolean): Observable<Venue[]>{
    return this.http.get<Venue[]>(this.baseUrl + 'venue/active/' + active);
  }

  getQualificationByCandidateId(candidateId:Number): Observable<Qualification[]>{
    return this.http.get<Qualification[]>(this.baseUrl + 'qualification/candidate/' + candidateId);
  }

  getExperienceByCandidateId(candidateId:Number): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.baseUrl + 'experience/candidate/' + candidateId);
  }
}
