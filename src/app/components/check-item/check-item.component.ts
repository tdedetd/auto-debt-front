import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ad-check-item',
  templateUrl: './check-item.component.html',
  styleUrls: ['./check-item.component.css']
})
export class CheckItemComponent implements OnInit {

  @Input() name: string;

  @Input() date: string;

  @Input() sum: number;

  constructor() { }

  ngOnInit() {
  }

}
