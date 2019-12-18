import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CandidatesService } from 'src/app/services/candidates.service';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { ActivatedRoute } from '@angular/router';
import { Qualification } from 'src/app/model/qualification';
import { Experience } from 'src/app/model/experience';
import { Skills } from 'src/app/model/skills';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {
  jobs: any;
  public items: any;
  candidate: Candidate;
  qualifications;
  experiences;
  skills;
  public today: any;

  constructor(
    private dataService: DataService,
    private candidateDetailsService: CandidatesService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.items = this.dataService.getJobs();
    const candiateId: any = this.route.snapshot.paramMap.get('candidateId');
    this.getCandidateById(candiateId);
    this.today = new Date();
  }

  getCandidateById(candidateId: number) {
    this.apiService.getCandidateById(candidateId).subscribe(data => {
      this.candidate = data;
      this.qualifications = this.candidate.qualificationDtos;
      this.experiences = this.candidate.experienceDtos;
      this.skills = this.candidate.candidateSkillDtos;

      console.log(this.candidate);
    }
    );
  }
}
