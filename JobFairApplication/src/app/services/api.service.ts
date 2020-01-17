import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../model/candidate';
import { Job } from '../model/job';
import { Venue } from '../model/venue';
import { Qualification } from '../model/qualification';
import { Experience } from '../model/experience';
import { VenueJob } from '../model/venueJob';
import { CandidateVenueJob, CandidateVenueJobDtoResponseList } from '../model/candidateVenueJob';
import { CountCandidates } from '../model/countCandidates';
import { CandidateVenueJobPriority } from '../model/candidateVenueJobPriority';
import { Skills } from '../model/skills';
import { CandidateScreening } from '../model/candidateScreening';
import { JobCategoryDto } from '../model/jobCategoryDto';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8081/'; // url to access backend
  // baseUrl = 'http://10.9.0.85:8081/';

  // candidates

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/all');
  }

  getCandidateIdByEmail(email: string): Observable<Candidate> {
    return this.http.get<Candidate>(this.baseUrl + 'candidate/email?email=' + email);
  }

  saveCandidate(candidate: Candidate): Observable<Candidate[]> {
    return this.http.post<Candidate[]>(this.baseUrl + 'candidate', candidate);
  }

  getCandidateById(candidateId: number): Observable<Candidate> {
    return this.http.get<Candidate>(this.baseUrl + 'candidate/' + candidateId);
  }

  // candidate venue job

  getCandidatesByVenueId(venueId: number, pageNumber: number, pageSize: number): Observable<CandidateVenueJobDtoResponseList[] | any> {
    return this.http.get<CandidateVenueJobDtoResponseList[] | any>(this.baseUrl + 'candidate-venue-job/candidates/' + venueId + '/' + pageNumber + '/' + pageSize);
  }

  getCountByVenueId(venueId: number): Observable<CountCandidates> {
    return this.http.get<CountCandidates>(this.baseUrl + 'candidate-venue-job/count-candidates/' + venueId);
  }

  saveCandidateVenueJob(candidateVenueJobPriority: CandidateVenueJobPriority): Observable<CandidateVenueJobPriority> {
    return this.http.post<CandidateVenueJobPriority>(this.baseUrl + 'candidate-venue-job', candidateVenueJobPriority);
  }

  getCandidateByDESC(venueId: number): Observable<CandidateVenueJob[]> {
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates-desc/' + venueId);
  }

  getCandidateByASC(venueId: number): Observable<CandidateVenueJob[]> {
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates-asc/' + venueId);
  }

  getCandidateByLastName(lastName: string): Observable<CandidateVenueJob[] | any> {
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates/lastname/' + lastName);
  }

  // candidate skills

  saveCandidateSkill(skill: Skills): Observable<Skills[]> {
    return this.http.post<Skills[]>(this.baseUrl + 'candidate-skill', skill);
  }

  // jobs

  getJobsByCategory(category: string): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl + 'job/category/' + category);
  }

  getJobsById(jobId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl + 'job/' + jobId);
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl + 'job/all');
  }

  // venue-job

  getJobsByVenueId(venueId: number): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[] | any>(this.baseUrl + 'venue-job/jobs/' + venueId);
  }

  getJobsByVenueIdAndCategory(venueId: number, category: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[] | any>(this.baseUrl + 'venue-job/jobs/category?venueId=' + venueId + '&category=' + category);
  }

  searchJobByTitle(venueId: number, title: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[]>(this.baseUrl + 'venue-job/jobs/title' + '?venueId=' + venueId + '&title=' + title);
  }

  searchJobByLevel(venueId: number, level: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[]>(this.baseUrl + 'venue-job/jobs/level' + '?venueId=' + venueId + '&level=' + level);
  }

  // venue

  getAllVenue(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.baseUrl + 'venue/all');
  }

  getVenueByActive(active: boolean): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.baseUrl + 'venue/active/' + active);
  }

  saveVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(this.baseUrl + 'venue', venue);
  }
  // qualifications

  getQualificationByCandidateId(candidateId: number): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(this.baseUrl + 'qualification/candidate/' + candidateId);
  }

  saveQualification(qualification: Qualification): Observable<Qualification[]> {
    return this.http.post<Qualification[]>(this.baseUrl + 'qualification', qualification);
  }

  // experience

  getExperienceByCandidateId(candidateId: number): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.baseUrl + 'experience/candidate/' + candidateId);
  }

  saveExperience(experience: Experience): Observable<Experience[]> {
    return this.http.post<Experience[]>(this.baseUrl + 'experience', experience);
  }

  // skills

  getAllSkills(): Observable<Skills[]> {
    return this.http.get<Skills[]>(this.baseUrl + 'skill/all');
  }

  getSkillByCandidateId(candidateId: number): Observable<Skills[] | any> {
    return this.http.get<Skills[] | any>(this.baseUrl + 'candidate-skill/candidate/' + candidateId);
  }

  // candidate screening

  saveCandidateScreening(candidateScreening: CandidateScreening): Observable<CandidateScreening[]> {
    return this.http.post<CandidateScreening[]>(this.baseUrl + 'candidate-screening', candidateScreening);
  }

  // candidate cv

  uploadCV(formData, httpOptions): Observable<any> {
    return this.http.post<any>( this.baseUrl + 'candidate/candidate-cv', formData, httpOptions);
  }

  getCandidateCV(candidateId: number): Observable<any> {
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/candidate-cv/' + candidateId);
  }

  // categoryCount

  getCategoryCount(): Observable<JobCategoryDto | any> {
    return this.http.get<JobCategoryDto>(this.baseUrl + 'job/category/count');
  }
}
