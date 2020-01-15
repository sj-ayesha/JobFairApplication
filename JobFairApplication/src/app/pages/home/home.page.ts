import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Candidate } from 'src/app/model/candidate';
import { Router } from '@angular/router';
import { Venue } from 'src/app/model/venue';
import { CandidateVenueJob } from 'src/app/model/candidateVenueJob';
import { JobCategoryDto } from 'src/app/model/jobCategoryDto';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  categoryTitle: [];
  categoryCount: JobCategoryDto;
  noCategory = false;
  softwareEngineer = false;
  manager = false;
  humanResource = false;
  qualityAssurance = false;
  businessAnalyst = false;
  architect = false;
  photos: any[];

  candidates: Candidate[];
  venues: Venue[];
  candidateVenueJobs: CandidateVenueJob[] = [];
  public countCandidates: any;
  public percentagCountCandidates: number;
  noCandidatesAvailable = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    // public camera: Camera,
    // public file: File
    ) {
  }

  ngOnInit() {
    this.populateCandidate();
    this.countCandidatesByVenue();
    console.log('onInit Triggered');
  }

  // takePhotos() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG
  //   }
  //   this.camera.getPicture().then((imagedata)=>{
  //     const filename = imagedata.substring(imagedata.lastIndexOf('/') + 1 );
  //     const path = imagedata.substring(0, imagedata.lastIndexOf('/') + 1 );
  //     this.file.readAsDataURL(path,filename).then((base64data) => {
  //       this.photos.push(base64data);
  //     })
  //   });
  // }

  ionViewWillEnter() {
    this.populateCandidate();
    this.countCandidatesByVenue();
    this.getCategory();
  }
  ionViewWillLeave(){
    // this.populateCandidate();
  }

  doRefresh(event) {
    this.ionViewWillEnter();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  private populateCandidate(): void {
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(parseInt(window.localStorage.getItem('venue_id')), 0, 5).subscribe(data => {
      this.candidateVenueJobs = data;

      if (this.candidateVenueJobs.length === 0) {
        this.noCandidatesAvailable = true;
      } else {
        this.noCandidatesAvailable = false;
      }

    });
  }

  private getCategory(): void {
    this.apiService.getCategoryCount().subscribe(data => {
      if (data.message === 'JOB_NOT_FOUND') {
        this.noCategory = true;
      } else {
        this.categoryCount = data;
        if (this.categoryCount.architect === 1) {
          this.architect = true;
        }
        if (this.categoryCount.softwareEngineer === 1) {
          this.softwareEngineer = true;
        }
        if (this.categoryCount.humanResource === 1) {
          this.humanResource = true;
        }
        if (this.categoryCount.qualityAssurance === 1) {
          this.qualityAssurance = true;
        }
        if (this.categoryCount.businessAnalyst === 1) {
          this.businessAnalyst = true;
        }
        if (this.categoryCount.manager === 1) {
          this.manager = true;
        }
      }
    });
  }

  routeTo(candidateId: number) {
    this.router.navigate(['/candidate-details', candidateId]);
  }

  routeToJob(jobQueryParam: string) {
    this.router.navigate(['/job-list', jobQueryParam]);
  }

  private countCandidatesByVenue(): void {
    // tslint:disable-next-line: radix
    this.apiService.getCountByVenueId(parseInt(window.localStorage.getItem('venue_id'))).subscribe(data => {
      this.countCandidates = data.countCandidates;
      this.percentagCountCandidates = (this.countCandidates / 100);
    });
  }
}
