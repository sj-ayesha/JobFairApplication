import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../model/candidate';
import { Job } from '../model/job';
import { Venue } from '../model/venue';
import { Qualification } from '../model/qualification';
import { Experience } from '../model/experience';
import { Skill } from '../model/skill';
import { VenueJob } from '../model/venueJob';
import { CandidateVenueJob } from '../model/candidateVenueJob';
import { CountCandidates } from '../model/countCandidates';
import { CandidateVenueJobPriority } from '../model/candidateVenueJobPriority';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8081/'; // url to access backend

  // candidates

  getAllCandidates(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/all');
  }

  getCandidateIdByEmail(email: String): Observable<Candidate>{
    return this.http.get<Candidate>(this.baseUrl + 'candidate/email?email=' + email);
  }

  saveCandidate(candidate: Candidate): Observable<Candidate[]> {
    return this.http.post<Candidate[]>(this.baseUrl + 'candidate', candidate);
  }

  getCandidateById(candidateId : Number): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/' + candidateId );
  }

  // candidate venue job

  getCandidatesByVenueId(venueId:Number): Observable<CandidateVenueJob[] | any>{
    return this.http.get<CandidateVenueJob[] | any>(this.baseUrl + 'candidate-venue-job/candidates/' + venueId);
  }

  getCountByVenueId(venueId:Number): Observable<CountCandidates>{
    return this.http.get<CountCandidates>(this.baseUrl + 'candidate-venue-job/count-candidates/' + venueId);
  }

  saveCandidateVenueJob(candidateVenueJobPriority: CandidateVenueJobPriority): Observable<CandidateVenueJobPriority> {
    return this.http.post<CandidateVenueJobPriority>(this.baseUrl + 'candidate-venue-job',candidateVenueJobPriority);
  }

  getCandidateByDESC(venueId:Number): Observable<CandidateVenueJob[]>{
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates-desc/' + venueId);
  }

  getCandidateByASC(venueId:Number): Observable<CandidateVenueJob[]>{
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates-asc/' + venueId);
  }

  getCandidateByLastName(lastName: String): Observable<CandidateVenueJob[]> {
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates/lastname/' + lastName);
  }

  // candidate skills

  saveCandidateSkill(skill: Skill[]): Observable<Skill[]>{
    return this.http.post<Skill[]>(this.baseUrl + 'candidate-skill',skill);
  }

  // jobs

  getJobsByCategory(category: String): Observable<Job[]>{
    return this.http.get<Job[]>(this.baseUrl + 'job/category/' + category);
  }

  getAllJobs():Observable<Job[]>{
    return this.http.get<Job[]>(this.baseUrl + 'job/all');
  }

  // venue-job

  getJobsByVenueId(venueId:Number): Observable<VenueJob[] | any>{
    return this.http.get<VenueJob[] | any>(this.baseUrl + 'venue-job/jobs/' + venueId);
  }

  getJobsByVenueIdAndCategory(venueId:Number,category:String): Observable<VenueJob[] | any>{
    return this.http.get<VenueJob[] | any>(this.baseUrl + 'venue-job/jobs/category?venueId=' + venueId + '&category=' + category);
  }

  // venue

  getVenueByActive(active:boolean): Observable<Venue[]>{
    return this.http.get<Venue[]>(this.baseUrl + 'venue/active/' + active);
  }

  // qualifications

  getQualificationByCandidateId(candidateId:Number): Observable<Qualification[]>{
    return this.http.get<Qualification[]>(this.baseUrl + 'qualification/candidate/' + candidateId);
  }

  saveQualification(qualification: Qualification): Observable<Qualification[]>{
    return this.http.post<Qualification[]>(this.baseUrl + 'qualification',qualification);
  }

  // experience

  getExperienceByCandidateId(candidateId:Number): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.baseUrl + 'experience/candidate/' + candidateId);
  }

  saveExperience(experience:Experience): Observable<Experience[]>{
    return this.http.post<Experience[]>(this.baseUrl + 'experience',experience);
  }

  // skills

  getAllSkills():Observable<Skill[]>{
    return this.http.get<Skill[]>(this.baseUrl + 'skill/all');
  }

  getSkillByCandidateId(candidateId:Number): Observable<Skill[] | any>{
    return this.http.get<Skill[] | any>(this.baseUrl + 'candidate-skill/candidate/' +candidateId)
  }

}
