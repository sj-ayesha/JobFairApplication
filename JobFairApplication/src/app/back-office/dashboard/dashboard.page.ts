import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;

  bars: any;
  colorArray: any;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['UOM', 'UTM', 'CTI'],
        datasets: [{
          label: 'Candidates',
          data: [2.5, 11, 4.5],
          backgroundColor: '#E23615', // array should have same number of elements as number of dataset
          borderColor: '#E23615', // array should have same number of elements as number of dataset
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
        }
      }
    });
  }

}
