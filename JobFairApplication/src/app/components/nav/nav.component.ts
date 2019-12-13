import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public venueName: String;

  constructor() { }

  ngOnInit() {
    this.venueName = window.localStorage.getItem('venue_id');
  }

}
