import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {

  venues: any;
  public select ="";
  constructor() { }

  ngOnInit() {

    this.venues = [
      { id: '1', venueName: 'UOM'},
      { id: '2', venueName: 'UTM'}
    ];
  }

  selected(){
    let a = document.getElementById('input').nodeValue;
    console.log('asaw', a);
  }

}
