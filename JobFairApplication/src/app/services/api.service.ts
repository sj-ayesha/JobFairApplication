import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { VenueJobMultipleSaveDto } from '../model/VenueJobMultipleSaveDto';
import { UserDto } from '../model/UserDto';
import { ApiResponse } from '../model/ApiResponse';
import { Dashboard } from '../model/dashboard';
import { RoleDto } from '../model/roleDto';
import { DownloadDto } from '../model/DownloadDto';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // baseUrl = 'https://93317c2c.ngrok.io/'; // url to access backend
  // baseUrl = 'http://10.9.0.85:8081/';
  baseUrl = 'http://localhost:8081/';

  // login
  authenticateUser(user: UserDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'token/generate-token', user);
  }

  // candidates

  getAllCandidates(pageNumber: number, pageSize: number): Observable<Candidate[] | any> {
    return this.http.get<Candidate[] | any>(this.baseUrl + 'candidate/all' + '/' + pageNumber + '/' + pageSize);
  }

  getAllCandidateVenueJob(): Observable<CandidateVenueJob[]> {
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + '/candidate-venue-job/all');
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
    return this.http.get<CandidateVenueJobDtoResponseList[] | any>
    (this.baseUrl + 'candidate-venue-job/candidates-by-venue/' + venueId + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  getAllCandidatesVenueJob(pageNumber: number, pageSize: number): Observable<CandidateVenueJobDtoResponseList[] | any> {
    return this.http.get<CandidateVenueJobDtoResponseList[] | any>
    (this.baseUrl + 'candidate-venue-job/all?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
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

  getAllCandidateByDESC(pageNumber: number, pageSize: number): Observable<CandidateVenueJobDtoResponseList[] | any> {
    return this.http.get<CandidateVenueJobDtoResponseList[] | any>
    (this.baseUrl + 'candidate-venue-job/all-candidates-desc?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  getCandidateByASC(venueId: number): Observable<CandidateVenueJob[]> {
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates-asc/' + venueId);
  }

  getAllCandidateByASC(pageNumber: number, pageSize: number): Observable<CandidateVenueJobDtoResponseList[] | any> {
    return this.http.get<CandidateVenueJobDtoResponseList[] | any>
    (this.baseUrl + 'candidate-venue-job/all-candidates-asc?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  getCandidateByLastName(lastName: string): Observable<CandidateVenueJob[] | any> {
    return this.http.get<CandidateVenueJob[]>(this.baseUrl + 'candidate-venue-job/candidates/lastname/' + lastName);
  }

  getAllCandidatesByScreeningStatus(screeningStatus: string, pageNumber: number, pageSize: number):
  Observable<CandidateVenueJobDtoResponseList[] | any> {
    return this.http.get<CandidateVenueJobDtoResponseList[] | any>
    (this.baseUrl + 'candidate-venue-job/candidates-screening-status/' + screeningStatus + '?pageNumber='
    + pageNumber + '&pageSize=' + pageSize);
  }

  getAllCandidatesByLevel(level: string, pageNumber: number, pageSize: number): Observable<CandidateVenueJobDtoResponseList[] | any> {
    return this.http.get<CandidateVenueJobDtoResponseList[] | any>
    (this.baseUrl + 'candidate-venue-job/candidates-level/' + level + '?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  // candidate skills

  saveCandidateSkill(skill: Skills): Observable<Skills[]> {
    return this.http.post<Skills[]>(this.baseUrl + 'candidate-skill', skill);
  }

  // jobs

  getJobsByCategory(category: string): Observable<Job[] | any> {
    return this.http.get<Job[] | any>(this.baseUrl + 'job/category/' + category);
  }

  getJobsById(jobId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl + 'job/' + jobId);
  }

  getAllJobs(pageNumber: number, pageSize: number): Observable<Job[] | any> {
    return this.http.get<Job[] | any>(this.baseUrl + 'job/all?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  saveJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl + 'job', job);
  }

  editJob(job: Job): Observable<Job> {
    return this.http.put<Job>(this.baseUrl + 'job/' + job.jobId, job);
  }

  searchAllJobsByTitle(title: string): Observable<Job[] | any> {
    return this.http.get<Job[]>(this.baseUrl + 'job/title' + '?title=' + title);
  }

  searchAllJobsByLevel(level: string): Observable<Job[] | any> {
    return this.http.get<Job[]>(this.baseUrl + 'job/level' + '?level=' + level);
  }
  // venue-job

  getJobsByVenueId(venueId: number, pageNumber: number, pageSize: number): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[] | any>(this.baseUrl + 'venue-job/jobs?venueId=' + venueId + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  getJobsByVenueIdAndCategory(venueId: number, category: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[] | any>(this.baseUrl + 'venue-job/jobs/category?venueId=' + venueId + '&category=' + category);
  }

  searchJobByTitle(venueId: number, title: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[]>(this.baseUrl + 'venue-job/jobs/title' + '?venueId=' + venueId + '&title=' + title);
  }

  searchJobByCategoryAndTitle(venueId: number, category: string, title: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[]>
    (this.baseUrl + 'venue-job/jobs/category/title' + '?venueId=' + venueId + '&category=' + category + '&title=' + title);
  }

  getJobByCategoryAndLevel(venueId: number, category: string, level: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[]>
    (this.baseUrl + 'venue-job/jobs/category/level' + '?venueId=' + venueId + '&category=' + category + '&level=' + level);
  }


  searchJobByLevel(venueId: number, level: string): Observable<VenueJob[] | any> {
    return this.http.get<VenueJob[]>(this.baseUrl + 'venue-job/jobs/level' + '?venueId=' + venueId + '&level=' + level);
  }

  saveMultipleVenueJob(multipleVenueJob: VenueJobMultipleSaveDto): Observable<VenueJobMultipleSaveDto | any> {
    return this.http.post<VenueJobMultipleSaveDto>(this.baseUrl + 'venue-job/multiple-job', multipleVenueJob);
  }

  // venue

  getAllVenue(pageNumber: number, pageSize: number): Observable<Venue[] | any> {
    return this.http.get<Venue[] | any>(this.baseUrl + 'venue/all?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
  }

  getVenueByActive(active: boolean): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.baseUrl + 'venue/active/' + active);
  }

  saveVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(this.baseUrl + 'venue', venue);
  }

  editVenue(venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(this.baseUrl + 'venue/' + venue.venueId, venue);
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

  saveSkill(skills: Skills): Observable<Skills[]> {
    return this.http.post<Skills[]>(this.baseUrl + 'skill', skills);
  }

  editSkill(skills: Skills): Observable<Skills> {
    return this.http.put<Skills>(this.baseUrl + 'skill/' + skills.skillId, skills);
  }

  // candidate screening

  saveCandidateScreening(candidateScreening: CandidateScreening): Observable<CandidateScreening[]> {
    return this.http.post<CandidateScreening[]>(this.baseUrl + 'candidate-screening', candidateScreening);
  }

  // candidate cv

  uploadCV(formData: FormData, httpOption): Observable<any> {
    return this.http.post<any>( this.baseUrl + 'candidate/candidate-cv', formData, httpOption);
  }

  getCandidateCV(filename: string): Observable<DownloadDto> {
  /*   let headers: HttpHeaders = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token')); */
    return this.http.get<DownloadDto>(this.baseUrl + 'candidate-file/' + filename);
  }

  // categoryCount

  getCategoryCount(): Observable<JobCategoryDto | any> {
    return this.http.get<JobCategoryDto>(this.baseUrl + 'job/category/count');
  }

  // Dashboard
  getCountByVenue(venueId: number): Observable<Dashboard | any> {
    return this.http.get<Dashboard>(this.baseUrl + 'candidate-venue-job/count-by-venue/' + venueId);
  }

  getCountByAllVenue(): Observable<Dashboard | any> {
    return this.http.get<Dashboard>(this.baseUrl + 'candidate-venue-job/count-by-all-venue');
  }

  // Role
  getRoleDetails(roleName: string): Observable<RoleDto | any> {
    return this.http.get<RoleDto | any>(this.baseUrl + 'role/' + roleName);
  }
}

