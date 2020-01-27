import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Candidate, CandidateResponseList } from 'src/app/model/candidate';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CandidateVenueJobDtoResponseList, CandidateVenueJob } from 'src/app/model/candidateVenueJob';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('horizontalBarChart', {static: false}) horizontalBarChart;
  @ViewChild('pieChart', {static: false}) pieChart;
  @ViewChild('verticalBarChart', {static: false}) verticalBarChart;
  @ViewChild ('doughnutChart', {static: false}) doughnutChart;

  horizontalBars: any;
  colorArray: any;
  pie: any;
  verticalBars: any;
  doughnut: any;

  allCandidates: Candidate[] = [];
  limit = 4;
  page = 0;
  totalPages = 0;
  noCandidatesAvailable = false;
  candidateVenueJobsLists: CandidateVenueJob[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.populateCandidate();
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

  // Pie Chart
  createPieChart() {
    this.pie = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
        datasets: [{
          label: 'Population (millions)',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [2478, 5267, 734, 784, 433]
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
          data: [43, 9],
          backgroundColor: 'rgb(226, 54, 21)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(226, 54, 21)', // array should have same number of elements as number of dataset
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
          data: [2, 3, 5, 6, 6, 7, 4, 2, 1, 2, 5, 0],
          backgroundColor: 'rgb(0, 102, 204)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(0, 102, 204)', // array should have same number of elements as number of dataset
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
            backgroundColor: ['#E23615', '#0080FF', '#00CC66'],
            data: [25, 35, 40]
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

  // FOR CANDIDATES BASED ON VENUE 
  populateCandidate() {
    this.candidateVenueJobsLists = [];
    // tslint:disable-next-line: radix
    this.apiService.getCandidatesByVenueId(1, this.page, this.limit).subscribe(
      (data: CandidateVenueJobDtoResponseList) => {
        this.candidateVenueJobsLists = [...this.candidateVenueJobsLists, ...data.candidateVenueJobDtoList];
        this.totalPages = data.totalPages;
        console.log(this.candidateVenueJobsLists);

        if (this.candidateVenueJobsLists.length === 0) {
          this.noCandidatesAvailable = true;
        } else {
          this.noCandidatesAvailable = false;
        }
      });

  }
  
  routeTo(candidateId: number) {
    this.router.navigate(['/candidate-details', candidateId]);
  }
}
