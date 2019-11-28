import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CandidatesService} from '../../services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
})
export class CandidateListPage implements OnInit {
  candidateDetails: any[];

  constructor(private router: Router, private candidateService: CandidatesService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   let id = parseInt(params.get('id'));
    //   this.candidateDetails = this.candidateService.getcandidateDetail();
    //   this.candidateDetails = this.candidateDetails.filter(data => data.id === id);
    // });
  }

  onSelect(id: number) {
    this.router.navigate(['/candidate-list', id]);
  }

}
