import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categoryTitle: [];

  candidates: Candidate[];
  constructor(private router: Router, private apiService: ApiService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.populateCandidate();
    this.categoryTitle = this.categoryService.getCategory();
  }

  populateCandidate(){
    this.apiService.getAllCandidates().subscribe(data => {
      this.candidates = data;
    });
  }



}
