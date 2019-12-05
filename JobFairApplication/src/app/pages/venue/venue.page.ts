import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {

  venues: Array<any>;
  public select ="";
  constructor() { }

  ngOnInit() {
    this.venues = [
      { id: '1', venueName: 'UOM'},
      { id: '2', venueName: 'UTM'}
    ];
  }

  selected(id){
    localStorage.setItem('venue id', id.target.value);
  }
}
