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

  horizontalBars: any;
  colorArray: any;
  pie: any;
  verticalBars: any;
  doughnut: any;

  allCandidates: Candidate[] = [];
  limit = 3;
  page = 0;
  totalPages = 0;
  noCandidatesAvailable = false;
  candidateVenueJobsLists: CandidateVenueJob[] = [];

  onTablet: boolean;

  limitVenue = 50;
  pageVenue = 0;
  venues: Venue[] = [];
  filterText: number = 0;
  formDashboard: FormGroup;

  jobNotFound = false;
  public venueJobs: VenueJob[] = [];
  noJobsAvailable = false;

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


  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) {
    this.formDashboard = this.formBuilder.group({
      venue: new FormControl()
    });
  }

  ngOnInit() {
    this.populateCandidate();
    this.getAllVenue();
    this.getAllJobsByVenueId();
    this.getData();

    const mq = window.matchMedia( '(max-width: 1024px)' );
    if (mq.matches) {
      this.onTablet = true;
    } else {
      this.onTablet = false;
    }

    console.log('this.on', this.onTablet);
  }


  ionViewDidEnter() {
    this.createPieChart();
    this.createHorizontalBarChart();
    this.createVerticalBarChart();
    this.createDoughnutChart();
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

  // FILTER BY VENUE
  filter(event) {
    this.venueJobs = [];
    this.filterText = event.target.value;
    if (this.filterText === 0) {
    } else {
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
          text: 'UTM Candidates & Jobs',
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

    console.log('rejected', this.countRejected);
  }

  // FOR CANDIDATES BASED ON VENUE
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

  // VENUE
  getAllVenue() {
    this.apiService.getAllVenue(this.pageVenue, this.limitVenue).subscribe(
      (data: VenueResponseList) => {

        this.venues = [...this.venues, ...data.venueDtoList];
        this.totalPages = data.totalPages;
      });
  }

  // Get All jobs by venue
  getAllJobsByVenueId(event?) {
    // tslint:disable-next-line: radix
    this.jobNotFound = false;
    this.apiService.getJobsByVenueId(this.filterText, this.page, this.limit).subscribe(
      (data: VenueJobResponseList) => {
        this.venueJobs = [...this.venueJobs, ...data.venueJobDtoList];
        console.log('jobs', this.venueJobs);
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

  getData() {
    this.apiService.getCountByVenue(this.filterText).subscribe((data) => {
      // Get count in months
      this.countJanuary = data.totalCandidatesPerMonthByVenue.totalCandidatesForJanuaryByVenue;
      this.countFebruary = data.totalCandidatesPerMonthByVenue.totalCandidatesForFebruaryByVenue;
      this.countMarch = data.totalCandidatesPerMonthByVenue.totalCandidatesForMarchByVenue;
      this.countApril = data.totalCandidatesPerMonthByVenue.totalCandidatesForAprilByVenue;
      this.countMay = data.totalCandidatesPerMonthByVenue.totalCandidatesForMayByVenue;
      this.countJune = data.totalCandidatesPerMonthByVenue.totalCandidatesForJuneByVenue;
      this.countJuly = data.totalCandidatesPerMonthByVenue.totalCandidatesForJulyByVenue;
      this.countAugust = data.totalCandidatesPerMonthByVenue.totalCandidatesForAugustByVenue;
      this.countSeptember = data.totalCandidatesPerMonthByVenue.totalCandidatesForSeptemberByVenue;
      this.countOctober = data.totalCandidatesPerMonthByVenue.totalCandidatesForOctoberByVenue;
      this.countNovember = data.totalCandidatesPerMonthByVenue.totalCandidatesForNovemberByVenue;
      this.countDecember = data.totalCandidatesPerMonthByVenue.totalCandidatesForDecemberByVenue;

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

      console.log(this.countJanuary);
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


    console.log('no.Candidates', this.countCandidates);
    console.log('no.Candidates', this.countJobsPerVenue);

    this.doughnut.update();
    this.verticalBars.update();
    this.horizontalBars.update();
    this.pie.update();
  }

}
