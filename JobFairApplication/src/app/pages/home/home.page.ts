import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Venue } from 'src/app/model/venue';
import { CandidateVenueJob } from 'src/app/model/candidateVenueJob';
import { CountCandidates } from 'src/app/model/countCandidates';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categoryTitle: [];

  candidates: Candidate[];
  venues: Venue[];
  candidateVenueJobs: CandidateVenueJob[];
  public countCandidates: any;
  public percentagCountCandidates: Number;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.populateCandidate();
    this.populateVenue();
    this.countCandidatesByVenue();

    
  }

  populateCandidate(){
    this.apiService.getCandidatesByVenueId(1).subscribe(data => {
      this.candidateVenueJobs = data;
      // console.log( this.candidateVenueJobs);
    });
  }

  routeTo(candidateId: number) {
        this.router.navigate(['/candidate-details', candidateId]);
  } 

  routeToJob(jobQueryParam:String) {
        this.router.navigate(['/job-list',jobQueryParam]);
  }

  populateVenue(active:boolean = true){
    this.apiService.getVenueByActive(active).subscribe(data=>{
      this.venues = data;
    });
  }

  countCandidatesByVenue(){
    this.apiService.getCountByVenueId(1).subscribe(data=>{
      this.countCandidates = data.countCandidates;
    this.percentagCountCandidates = (this.countCandidates / 100);
    });
  }
}
