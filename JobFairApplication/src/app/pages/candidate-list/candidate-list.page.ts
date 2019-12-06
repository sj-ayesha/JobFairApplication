import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CandidatesService} from '../../services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { CandidateVenueJob } from 'src/app/model/candidateVenueJob';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {
  candidateDetails: any[];
  candidateVenueJobs: CandidateVenueJob[];

  constructor(private router: Router, private candidateService: CandidatesService, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   let id = parseInt(params.get('id'));
    //   this.candidateDetails = this.candidateService.getcandidateDetail();
    //   this.candidateDetails = this.candidateDetails.filter(data => data.id === id);
    // });
    this.populateCandidate();
  }

  onSelect(id: number) {
    this.router.navigate(['/candidate-list', id]);
    this.populateCandidate();
  }

  populateCandidate(){
    this.apiService.getCandidatesByVenueId(1).subscribe(data => {
      this.candidateVenueJobs = data;
      console.log( this.candidateVenueJobs);
    });
  }

  routeTo(candidateId: number) {
        this.router.navigate(['/candidate-details', candidateId]);
  } 
}
