import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../model/candidate';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8081/'; // url to access backend

  getAllCandidates(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.baseUrl + 'candidate/all');
  }

  saveCandidate(candidate: Candidate): Observable<Candidate[]>{
    return this.http.post<Candidate[]>(this.baseUrl,Candidate);
  }


}
