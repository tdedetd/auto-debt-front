import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ad-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() background: string;

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
