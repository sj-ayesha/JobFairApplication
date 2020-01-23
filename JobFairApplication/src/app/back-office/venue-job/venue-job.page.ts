import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-venue-job',
  templateUrl: './venue-job.page.html',
  styleUrls: ['./venue-job.page.scss'],
})
export class VenueJobPage implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {

  }


}
