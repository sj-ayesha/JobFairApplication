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
  public countCandidates: any;
  noCandidatesAvailable = false;

  constructor(private router: Router, private candidateService: CandidatesService, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   let id = parseInt(params.get('id'));
    //   this.candidateDetails = this.candidateService.getcandidateDetail();
    //   this.candidateDetails = this.candidateDetails.filter(data => data.id === id);
    // });
    this.populateCandidate();
    this.countCandidatesByVenue();
  }

  onSelect(id: number) {
    this.router.navigate(['/candidate-list', id]);
    this.populateCandidate();
  }

  populateCandidate(){
    this.apiService.getCandidatesByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      if(data.message == "NO_CANDIDATE_VENUE_JOB_AVAILABLE"){
        this.noCandidatesAvailable = true;
      } else {
        this.candidateVenueJobs = data;
      // console.log( this.candidateVenueJobs);
      }
    });
  }

  routeTo(candidateId: number) {
        this.router.navigate(['/candidate-details', candidateId]);
  } 

  countCandidatesByVenue() {
    this.apiService.getCountByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.countCandidates = data.countCandidates;
    });
  }

  getCandidateByAsc(){
    this.apiService.getCandidateByASC(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.candidateVenueJobs = data;
    })
  }

  getCandidateByDesc(){
    this.apiService.getCandidateByDESC(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.candidateVenueJobs = data;
    })
  }

  searchByLastName(lastName:any){
    this.apiService.getCandidateByLastName(lastName).subscribe(data => {
      this.candidateVenueJobs = data;
    });
  }
}
