import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  candidates: Candidate[];
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.populateCandidate();
  }

  populateCandidate(){
    this.apiService.getAllCandidates().subscribe(data => {
      this.candidates = data;
    });
  }

}
