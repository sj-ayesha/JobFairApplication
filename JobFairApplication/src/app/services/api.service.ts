import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../model/candidate';
import { Job } from '../model/job';
import { Venue } from '../model/venue';
import { Qualification } from '../model/qualification';
import { Experience } from '../model/experience';
import { Skill } from '../model/skill';


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

  getCandidateIdByEmail(email: String): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/email?email=' + email);
  }

  saveCandidate(candidate: Candidate): Observable<Candidate[]> {
    return this.http.post<Candidate[]>(this.baseUrl + 'candidate', candidate);
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

  saveExperience(experience:Experience): Observable<Experience[]>{
    return this.http.post<Experience[]>(this.baseUrl + 'experience',experience);
  }

  getAllSkills():Observable<Skill[]>{
    return this.http.get<Skill[]>(this.baseUrl + 'skill/all');
  }

  saveQualification(qualification: Qualification): Observable<Qualification[]>{
    return this.http.post<Qualification[]>(this.baseUrl + 'qualification',qualification);
  }

  saveCandidateSkill(skill: Skill[]): Observable<Skill[]>{
    return this.http.post<Skill[]>(this.baseUrl + 'candidate-skill',skill);
  }
}
