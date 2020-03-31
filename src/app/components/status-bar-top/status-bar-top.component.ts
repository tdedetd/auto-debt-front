import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ad-status-bar-top',
  templateUrl: './status-bar-top.component.html',
  styleUrls: ['./status-bar-top.component.css']
})
export class StatusBarTopComponent implements OnInit {

  faChevronLeft = faChevronLeft;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onBackButtonClick() {
    this.location.back();
  }

}
