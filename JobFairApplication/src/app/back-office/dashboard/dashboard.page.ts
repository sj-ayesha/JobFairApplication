import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Candidate, CandidateResponseList } from 'src/app/model/candidate';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CandidateVenueJobDtoResponseList, CandidateVenueJob } from 'src/app/model/candidateVenueJob';
import { Venue, VenueResponseList } from 'src/app/model/venue';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VenueJobResponseList, VenueJob } from 'src/app/model/venueJob';
import { Dashboard } from 'src/app/model/dashboard';
import { CandidatesPerMonth } from 'src/app/model/CandidatesPerMonth';
import { JobResponseList, Job } from 'src/app/model/job';
import { RoleDto } from 'src/app/model/roleDto';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { LoginLogoutService } from 'src/app/services/login-logout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('horizontalBarChart', { static: false }) horizontalBarChart;
  @ViewChild('pieChart', { static: false }) pieChart;
  @ViewChild('verticalBarChart', { static: false }) verticalBarChart;
  @ViewChild('doughnutChart', { static: false }) doughnutChart;

  formDashboard: FormGroup;

  horizontalBars: any;
  colorArray: any;
  pie: any;
  verticalBars: any;
  doughnut: any;

  limit = 3;
  page = 0;
  totalPages = 0;

  onTablet: boolean;
  noCandidatesAvailable = false;
  venue = false;
  jobNotFound = false;

  limitVenue = 50;
  pageVenue = 0;
  filterText: number = 0;

  roleManager: boolean;
  private MANAGERSubscription: Subscription;

  noJobsAvailable = false;
  public venueJobs: VenueJob[] = [];
  allCandidates: Candidate[] = [];
  candidateVenueJobsLists: CandidateVenueJob[] = [];
  venues: Venue[] = [];
  jobs: Job[] = [];
  dashboard: Dashboard[] = [];
  totalCandidatesPerMonth: CandidatesPerMonth[] = [];
  countJanuary: any = [];
  countFebruary: any = [];
  countMarch: any = [];
  countApril: any = [];
  countMay: any = [];
  countJune: any = [];
  countJuly: any = [];
  countAugust: any = [];
  countSeptember: any = [];
  countOctober: any = [];
  countNovember: any = [];
  countDecember: any = [];
  countAccepted: any = [];
  countRejected: any = [];
  countProceed: any = [];
  countCandidates: any = [];
  countJobsPerVenue: any = [];
  countSoftware: any = [];
  countHR: any = [];
  countBA: any = [];
  countArchitect: any = [];
  countQA: any = [];
  countManager: any = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loginLogoutService: LoginLogoutService) {
    this.formDashboard = this.formBuilder.group({
      venue: new FormControl()
    });
  }

  ngOnInit() {
    this.populateCandidate();
    this.getAllVenue();
    this.getAllJobsByVenueId();
    this.getAllData();

    this.getAllJobs();
    this.getAllCandidatesOfAllVenue();

    const mq = window.matchMedia('(max-width: 1024px)');
    if (mq.matches) {
      this.onTablet = true;
    } else {
      this.onTablet = false;
    }

    if (localStorage.getItem('role') === 'MANAGER') {
      this.roleManager = true;
    }

    this.MANAGERSubscription = this.loginLogoutService.EmitMANAGER.subscribe(data => this.roleManager = data);
  }

  ngOnDestroy() {
    this.MANAGERSubscription.unsubscribe();
  }


  ionViewDidEnter() {
    this.createPieChart();
    this.createHorizontalBarChart();
    this.createVerticalBarChart();
    this.createDoughnutChart();

    setTimeout(() => {
      this.chartUpdate();
    }, 100);
  }

  doRefresh(event) {
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  routeTo(candidateId: number) {
    this.router.navigate(['/candidate-details', candidateId]);
  }

  // filter by venue
  filter(event) {
    this.venueJobs = [];
    this.filterText = event.target.value;
    // tslint:disable-next-line: triple-equals
    if (this.filterText == 0) {
      this.venue = false;
      this.getAllJobs();
      this.getAllCandidatesOfAllVenue();
      this.getAllData();
      setTimeout(() => {
        this.chartUpdate();
      }, 100);
    } else {
      this.venue = true;
      this.getAllJobsByVenueId();
      this.populateCandidate();
      this.getData();
      setTimeout(() => {
        this.chartUpdate();
      }, 100);
    }
  }

  // Pie Chart
  createPieChart() {
    const phone = window.matchMedia('(max-width: 600px)');
    if (phone.matches) {
      this.pieChart.nativeElement.height = 700;
    }

    this.pie = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['SE', 'HR', 'BA', 'Architect', 'QA', 'Manager'],
        datasets: [{
          label: 'Candidates',
          backgroundColor: ['#833471', '#EA2027', '#EE5A24', '#0652DD', '#009432', '#F79F1F'],
          data: [this.countSoftware, this.countHR, this.countBA, this.countArchitect, this.countQA, this.countManager]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Candidates per Job',
          fontStyle: 'normal',
          fontFamily: 'Proxima Nova Regular',
          fontSize: 24,
          fontColor: '#414344'
        }
      }
    });
  }

  // Horizontal Bar Chart
  createHorizontalBarChart() {
    this.horizontalBars = new Chart(this.horizontalBarChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ['Candidates', 'Jobs'],
        datasets: [{
          label: 'List of Candidates & Jobs',
          data: [this.countCandidates, this.countJobsPerVenue],
          backgroundColor: '#0652DD', // array should have same number of elements as number of dataset
          borderColor: '#0652DD', // array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Candidates & Jobs',
          fontStyle: 'normal',
          fontFamily: 'Proxima Nova Regular',
          fontSize: 24,
          fontColor: '#414344'
        }
      }
    });
  }

  // Vertical Bar Chart
  createVerticalBarChart() {
    const phone = window.matchMedia('(max-width: 600px)');
    if (phone.matches) {
      this.verticalBarChart.nativeElement.height = 700;
    }
    this.verticalBars = new Chart(this.verticalBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020',
          'Jul 2020', 'Aug 2020', 'Sep 2020', 'Oct 2020', 'Nov 2020', 'Dec 2020'],
        datasets: [{
          label: 'No. of Candidates',
          data: [this.countJanuary, this.countFebruary, this.countMarch, this.countApril, this.countMay, this.countJune, this.countJuly,
          this.countAugust, this.countSeptember, this.countOctober, this.countNovember, this.countDecember],
          backgroundColor: '#009432', // array should have same number of elements as number of dataset
          borderColor: '#009432', // array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Availability of Candidates by Date',
          fontStyle: 'normal',
          fontFamily: 'Proxima Nova Regular',
          fontSize: 24,
          fontColor: '#414344'
        }
      }
    });
  }

  // Doughnut Chart
  createDoughnutChart() {
    this.doughnut = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Rejected', 'Proceed to next interview', 'Accepted'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: ['#EA2027', '#0652DD', '#009432'],
            data: [this.countRejected, this.countProceed, this.countAccepted]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Candidates per Screening',
          fontStyle: 'normal',
          fontFamily: 'Proxima Nova Regular',
          fontSize: 24,
          fontColor: '#414344'
        }
      }
    });
  }

  // all candidates based on a specific venue
  populateCandidate() {
    this.candidateVenueJobsLists = [];
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(this.filterText, this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;

        if (this.candidateVenueJobsLists.length === 0) {
          this.noCandidatesAvailable = true;
        } else {
          this.noCandidatesAvailable = false;
        }
      });

  }
  // all candidate based on all venue
  getAllCandidatesOfAllVenue() {
    this.candidateVenueJobsLists = [];
    this.apiService.getAllCandidatesVenueJob(this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;

        if (this.candidateVenueJobsLists.length === 0) {
          this.noCandidatesAvailable = true;
        } else {
          this.noCandidatesAvailable = false;
        }
      });
  }

  // all venue
  getAllVenue() {
    this.apiService.getAllVenue(this.pageVenue, this.limitVenue).subscribe(
      (data: VenueResponseList) => {
        this.venues = [...this.venues, ...data.venueDtoList];
        this.totalPages = data.totalPages;
      });
  }

  // get all jobs
  getAllJobs() {
    this.jobs = [];
    this.apiService.getAllJobs(this.page, this.limit).subscribe(
      (data: JobResponseList) => {
        this.jobs = [...this.jobs, ...data.jobDtoList];
      });
  }


  // get all jobs by venue
  getAllJobsByVenueId(event?) {
    this.venueJobs = [];
    // tslint:disable-next-line: radix
    this.jobNotFound = false;
    this.apiService.getJobsByVenueId(this.filterText, this.page, this.limit).subscribe(
      (data: VenueJobResponseList) => {
        this.venueJobs = [...this.venueJobs, ...data.venueJobDtoList];
        this.totalPages = data.totalPages;

        if (this.venueJobs.length === 0) {
          this.noJobsAvailable = true;
        } else {
          this.noJobsAvailable = false;
        }
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  // get all data for for chart
  getAllData() {
    this.apiService.getCountByAllVenue().subscribe((data) => {
      // Get count in months
      this.countJanuary = data.totalCandidatesPerMonth.totalCandidatesForJanuary;
      this.countFebruary = data.totalCandidatesPerMonth.totalCandidatesForFebruary;
      this.countMarch = data.totalCandidatesPerMonth.totalCandidatesForMarch;
      this.countApril = data.totalCandidatesPerMonth.totalCandidatesForApril;
      this.countMay = data.totalCandidatesPerMonth.totalCandidatesForMay;
      this.countJune = data.totalCandidatesPerMonth.totalCandidatesForJune;
      this.countJuly = data.totalCandidatesPerMonth.totalCandidatesForJuly;
      this.countAugust = data.totalCandidatesPerMonth.totalCandidatesForAugust;
      this.countSeptember = data.totalCandidatesPerMonth.totalCandidatesForSeptember;
      this.countOctober = data.totalCandidatesPerMonth.totalCandidatesForOctober;
      this.countNovember = data.totalCandidatesPerMonth.totalCandidatesForNovember;
      this.countDecember = data.totalCandidatesPerMonth.totalCandidatesForDecember;

      // Count No. of Candidates per Category
      this.countSoftware = data.totalCandidatesPerSoftwareEngineerByAllVenue;
      this.countHR = data.totalCandidatesPerHumanResourceByAllVenue;
      this.countBA = data.totalCandidatesPerBusinessAnalystByAllVenue;
      this.countArchitect = data.totalCandidatesPerArchitectByAllVenue;
      this.countQA = data.totalCandidatesPerQualityAssuranceByAllVenue;
      this.countManager = data.totalCandidatesPerManagerByAllVenue;

      // count of screening status
      this.countAccepted = data.totalApprovedScreeningStatusByAllVenue;
      this.countRejected = data.totalRejectedScreeningStatusByAllVenue;
      this.countProceed = data.totalProceedScreeningStatusByAllVenue;

      // count total no. of candidates
      this.countCandidates = data.totalCandidatesByAllVenue;

      // Count No. of Jobs for all venue
      this.countJobsPerVenue = data.totalJobsByAllVenue;
    });
  }

  getData() {
    this.apiService.getCountByVenue(this.filterText).subscribe((data) => {
      // Get count in months
      this.countJanuary = data.totalCandidatesPerMonth.totalCandidatesForJanuary;
      this.countFebruary = data.totalCandidatesPerMonth.totalCandidatesForFebruary;
      this.countMarch = data.totalCandidatesPerMonth.totalCandidatesForMarch;
      this.countApril = data.totalCandidatesPerMonth.totalCandidatesForApril;
      this.countMay = data.totalCandidatesPerMonth.totalCandidatesForMay;
      this.countJune = data.totalCandidatesPerMonth.totalCandidatesForJune;
      this.countJuly = data.totalCandidatesPerMonth.totalCandidatesForJuly;
      this.countAugust = data.totalCandidatesPerMonth.totalCandidatesForAugust;
      this.countSeptember = data.totalCandidatesPerMonth.totalCandidatesForSeptember;
      this.countOctober = data.totalCandidatesPerMonth.totalCandidatesForOctober;
      this.countNovember = data.totalCandidatesPerMonth.totalCandidatesForNovember;
      this.countDecember = data.totalCandidatesPerMonth.totalCandidatesForDecember;

      // count of screening status
      this.countAccepted = data.totalApprovedScreeningStatusByVenue;
      this.countRejected = data.totalRejectedScreeningStatusByVenue;
      this.countProceed = data.totalProceedScreeningStatusByVenue;

      // Count No. of Jobs per Venue
      this.countJobsPerVenue = data.totalJobsByVenue;

      // Count No. of Candidates per Category
      this.countSoftware = data.totalCandidatesPerSoftwareEngineerByVenue;
      this.countHR = data.totalCandidatesPerHumanResourceByVenue;
      this.countBA = data.totalCandidatesPerBusinessAnalystByVenue;
      this.countArchitect = data.totalCandidatesPerArchitectByVenue;
      this.countQA = data.totalCandidatesPerQualityAssuranceByVenue;
      this.countManager = data.totalCandidatesPerManagerByVenue;
    });

    // Count No. of Candidates per Venue
    this.apiService.getCountByVenueId(this.filterText).subscribe(data => {
      this.countCandidates = data.countCandidates;
    });
  }

  // changeFilterTextValue() {
  //   this.filterText = 1;
  //   this.getData();
  // }

  // update chart when filter text changes in dropdown
  chartUpdate() {
    this.doughnut.data.datasets[0].data[0] = this.countRejected;
    this.doughnut.data.datasets[0].data[1] = this.countProceed;
    this.doughnut.data.datasets[0].data[2] = this.countAccepted;

    this.verticalBars.data.datasets[0].data[0] = this.countJanuary;
    this.verticalBars.data.datasets[0].data[1] = this.countFebruary;
    this.verticalBars.data.datasets[0].data[2] = this.countMarch;
    this.verticalBars.data.datasets[0].data[3] = this.countApril;
    this.verticalBars.data.datasets[0].data[4] = this.countMay;
    this.verticalBars.data.datasets[0].data[5] = this.countJune;
    this.verticalBars.data.datasets[0].data[6] = this.countJuly;
    this.verticalBars.data.datasets[0].data[7] = this.countAugust;
    this.verticalBars.data.datasets[0].data[8] = this.countSeptember;
    this.verticalBars.data.datasets[0].data[9] = this.countOctober;
    this.verticalBars.data.datasets[0].data[10] = this.countNovember;
    this.verticalBars.data.datasets[0].data[11] = this.countDecember;

    this.horizontalBars.data.datasets[0].data[0] = this.countCandidates;
    this.horizontalBars.data.datasets[0].data[1] = this.countJobsPerVenue;

    this.pie.data.datasets[0].data[0] = this.countSoftware;
    this.pie.data.datasets[0].data[1] = this.countHR;
    this.pie.data.datasets[0].data[2] = this.countBA;
    this.pie.data.datasets[0].data[3] = this.countArchitect;
    this.pie.data.datasets[0].data[4] = this.countQA;
    this.pie.data.datasets[0].data[5] = this.countManager;

    this.doughnut.update();
    this.verticalBars.update();
    this.horizontalBars.update();
    this.pie.update();
  }

  getRoleDetails() {
    this.apiService.getRoleDetails(localStorage.getItem('role')).subscribe(data => {
    });
  }
}
