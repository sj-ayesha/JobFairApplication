import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Candidate } from 'src/app/model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  public candidates: any = [];

  baseUrl = 'http://localhost:8081/';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getcandidateDetail() {
    return this.candidates;
  }

  uploadCVs(candidateDto: Candidate, attachments: File[]) {
    const formData: FormData = new FormData();
    const json = JSON.stringify(candidateDto);
    const blob = new Blob([json], {
      type: 'application/json'
    });


    formData.append('candidateDto', blob);

    attachments.forEach(attachment => {
      formData.append('file', attachment);
    });

    console.log(formData);

    return this.apiService.uploadCV(formData);

  }
}
